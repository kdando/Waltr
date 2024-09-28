// pages/api/search.js

import axios from 'axios';

import { describePeriod, parseDate, compareDates } from '@/utils/apiHelpers';

/*

WE NORMALISE API RESULTS TO AN OBJECT THE FOLLOWING SHAPE FOR CONSISTENCY.
This is partly-based on the Met API response, with some changes.
All frontend logic expects results in this shape, so all backend calls must normalise results to it.

 const newObject = {
            objectID: <number>
            title: <the "display name" of the object>
            objectName: <the "subtitle" kind of name, more a description, e.g. "cup and saucer">
            objectDate: <the earliest date, we sort based on this>
            culture: <what culture the object is from (sometimes this is just the "place")>
            period: <a period if we have one, a span of dates if not - TO BE AMMENDED>
            briefDescription: <a description of the object>
            repository: <where it is, mostly this will reflect which API we called for it>
            objectURL: <a link to the object's page on the relevant museum website>
            primaryImageSmall: <the image we use on search results and collection previews>
            objectImages: <an ARRAY of urls for all available images of the object from the API>
        };

*/

// CURRENT APIS IN USE, WHEN ADDING MORE START WITH A CONSTANT HERE
const MET_API_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';
const VNA_API_URL = 'https://api.vam.ac.uk/v2';

//FUNCTION FOR BUILDING IIIF URLS FOR V&A OBJECTS
function constructIIIFImageURLs(imageIIIFNumbers) {
    const baseIIIFURL = "https://framemark.vam.ac.uk/collections/";
    const completedImageURLs = imageIIIFNumbers.map(imageID => {
        return `${baseIIIFURL}${imageID}/full/!200,200/0/default.jpg`
    });
    return completedImageURLs;
}

//FUNCTION FOR FETCHING INDIVIDUAL OBJECT FROM MET
async function fetchObjectMet(objectId) {
    try {
        const result = await axios.get(`${MET_API_URL}/objects/${objectId}`);

        // Validate result was genuine
        if (result.data.message === 'Not a valid object') {
            return null;
        }

        const data = result.data

        let objectImages = [data.primaryImage, ...data.additionalImages]

        //NORMALISING MET RESULT
        const newObject = {
            objectID: data.objectID,
            title: data.title || '',
            objectName: data.objectName || '',
            objectDate: data.objectDate || '',
            culture: data.culture || '',
            period: data.period || '',
            briefDescription: data.briefDescription || '',
            repository: data.repository,
            objectURL: data.objectURL,
            primaryImageSmall: data.primaryImageSmall || null,
            objectImages: objectImages.length > 0 ? objectImages : null
        };
        console.log("HERES THE NEW OBJECT FROM MET")
        console.log(newObject)
        return newObject;


    } catch (error) {
        console.error(`Error fetching object ID ${objectId} from MET:`, error);
        return null;
    }
}

//FUNCTION FOR FETCHING INDIVIDUAL OBJECT FROM V&A
async function fetchObjectVnA(systemNumber) {
    try {
        const response = await axios.get(`${VNA_API_URL}/museumobject/${systemNumber}`);

        // Validate result was genuine
        if (response.data.detail === 'Not Found') {
            return null;
        }

        const data = response.data.record;

        ///// BUILDING PATHS FOR IIIF IMAGES
        let objectImages = [];
        if (data.images.length > 0) {
            objectImages = constructIIIFImageURLs(data.images)
        }

        // CREATING PERIOD STRING BASED ON DATES
        let objectPeriod = "";
        if (data.productionDates[0].date.earliest && data.productionDates[0].date.latest) {
            objectPeriod = describePeriod(data.productionDates[0].date.earliest, data.productionDates[0].date.latest)
        }

        //NORMALISING V&A RESULT
        const newObject = {
            objectID: systemNumber,
            title: data.titles[0]?.title || '',
            objectName: data.objectType || '',
            objectDate: data.productionDates[0]?.date?.text || '',
            culture: data.placesOfOrigin?.[0]?.place?.text || '',
            period: objectPeriod,
            briefDescription: data.briefDescription || '',
            repository: 'Victoria and Albert Museum, London',
            objectURL: `https://collections.vam.ac.uk/item/${data.systemNumber}/`,
            primaryImageSmall: objectImages[0] ? objectImages[0] : null,
            objectImages: objectImages.length > 0 ? objectImages : null
        };

        return newObject;
    } catch (error) {
        console.error(`Error fetching data for systemNumber: ${systemNumber} from VnA:`, error);
        throw error;
    }
}

export default async function handler(req, res) {
    const { searchTerm, showInCollection, showHasImages, sortOrder, resultsPerPage = 10, currentPage = 1 } = req.query;

    // Validate query parameter
    if (!searchTerm || typeof searchTerm !== 'string') {
        return res.status(400).json({ message: 'Invalid query parameter' });
    }

    // Parse pagination parameters
    const parsedCurrentPage = parseInt(currentPage, 10);
    const parsedResultsPerPage = parseInt(resultsPerPage, 10);

    // Validate results per page and current page parameters
    if (!Number.isInteger(parsedCurrentPage) || parsedCurrentPage <= 0) {
        return res.status(400).json({ message: 'Invalid currentPage parameter' });
    }

    if (!Number.isInteger(parsedResultsPerPage) || parsedResultsPerPage <= 0) {
        return res.status(400).json({ message: 'Invalid resultsPerPage parameter' });
    }

    // MAIN API QUERYING LOGIC
    try {

        // Build the Met API URL
        const metApiUrl = `${MET_API_URL}/search?q=${searchTerm}${showHasImages === 'true' ? '&hasImages=true' : ''}`;

        // Build the V&A API URL
        let vnaApiUrl = `${VNA_API_URL}/objects/search?q=${searchTerm}${showHasImages === 'true' ? '&images_exist=1' : ''}`;

        // plus sorting parameters for V&A
        if (sortOrder === 'oldestFirst') {
            vnaApiUrl += '&order_by=date&order_sort=asc';
        } else if (sortOrder === 'newestFirst') {
            vnaApiUrl += '&order_by=date&order_sort=desc';
        }

        const [metResponse, vnaResponse] = await Promise.all([
            axios.get(metApiUrl),
            axios.get(vnaApiUrl)
        ]);

        const metObjectIds = metResponse.data.objectIDs || [];
        const vnaSystemNumbers = vnaResponse.data.records?.map((record) => record.systemNumber) || [];

        // Calculate pagination indices
        const startIndex = (parsedCurrentPage - 1) * parsedResultsPerPage;
        const endIndex = startIndex + parsedResultsPerPage;

        // Fetch objects from both APIs based on the pagination
        const metObjectsPromises = metObjectIds.slice(startIndex, endIndex).map(fetchObjectMet);
        const vnaObjectsPromises = vnaSystemNumbers.slice(startIndex, endIndex).map(fetchObjectVnA);

        const metObjects = await Promise.all(metObjectsPromises);
        const vnaObjects = await Promise.all(vnaObjectsPromises);

        // Combine and filter results
        const allObjects = [...metObjects, ...vnaObjects].filter((obj) => obj !== null);


        // Sort combined results
        if (sortOrder === 'oldestFirst') {
            allObjects.sort((a, b) => compareDates(a.objectDate, b.objectDate));
        } else if (sortOrder === 'newestFirst') {
            allObjects.sort((a, b) => compareDates(b.objectDate, a.objectDate));
        }

        res.json(allObjects);

        // res.status(500).json({ message: 'Internal Server Error' });
    } catch (error) {
        console.error('Error fetching data from APIs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}