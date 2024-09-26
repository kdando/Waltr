// pages/api/search.js

import axios from 'axios';

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
        if (result.data.message === 'Not a valid object') {
            return null;
        }
        return result.data;
    } catch (error) {
        console.error(`Error fetching object ID ${objectId} from MET:`, error);
        return null;
    }
}

//FUNCTION FOR FETCHING INDIVIDUAL OBJECT FROM V&A
async function fetchObjectVnA(systemNumber) {
    try {
        const response = await axios.get(`${VNA_API_URL}/museumobject/${systemNumber}`);

        if (response.data.detail === 'Not Found') {
            return null;
        }

        const data = response.data.record;

        ///// BUILDING PATHS FOR IIIF IMAGES
        let objectImages = [];

        if (data.images.length > 0) {
            objectImages = constructIIIFImageURLs(data.images)
        }
        ////


        const newObject = {
            objectID: systemNumber,
            title: data.titles[0]?.title || '',
            objectName: data.objectType || '',
            objectDate: data.productionDates[0]?.date?.text || '',
            culture: data.placesOfOrigin?.[0]?.place?.text || '',
            period: `${data.productionDates[0]?.date?.earliest || ''} to ${data.productionDates[0]?.date?.latest || ''}`,
            repository: 'Victoria and Albert Museum, London',
            objectURL: `https://collections.vam.ac.uk/item/${data.systemNumber}/`,
            primaryImageSmall: objectImages[0] ? objectImages[0] : null,
            objectImages: objectImages.length > 0 ? objectImages : null
        };

        console.log(newObject); ///////LOGGING NEW OBJECT

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
        console.log("HELLO KARL, LOOK HERE PAL");
        console.log("THIS IS THE QUERY VARIABLE, BEING EMBEDDED IN PINGS TO APIS:");
        console.log(searchTerm);
        console.log("GOT IT?");

        // Fetch data from both APIs
        const [metResponse, vnaResponse] = await Promise.all([
            axios.get(`${MET_API_URL}/search?q=${searchTerm}`),
            axios.get(`${VNA_API_URL}/objects/search?q=${searchTerm}`)
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
        res.json(allObjects);
    } catch (error) {
        console.error('Error fetching data from APIs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}