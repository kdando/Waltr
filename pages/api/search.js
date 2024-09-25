// pages/api/search.js

import axios from 'axios';

const MET_API_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';
const VNA_API_URL = 'https://api.vam.ac.uk/v2';

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

async function fetchObjectVnA(systemNumber) {
    try {
        const response = await axios.get(`${VNA_API_URL}/museumobject/${systemNumber}`);
        const data = response.data.record;

        // // Generate a unique objectID based on systemNumber and another unique identifier (e.g., objectNumber)
        // const newObjectId = `VNA-${data.systemNumber}-${data.objectNumber}`;

        const newObject = {
            objectID: systemNumber, // Use the V&A systemNumber for the objectID field so result object matches shape of Met API result
            title: data.titles[0]?.title || '',
            objectName: data.objectType || '',
            objectDate: data.productionDates[0]?.date?.text || '',
            culture: data.placesOfOrigin?.[0]?.place?.text || '',
            period: `${data.productionDates[0]?.date?.earliest || ''} to ${data.productionDates[0]?.date?.latest || ''}`,
            repository: 'Victoria and Albert Museum, London',
            objectURL: `https://collections.vam.ac.uk/item/${data.systemNumber}/`,
        };

        return newObject;
    } catch (error) {
        console.error(`Error fetching data for systemNumber: ${systemNumber} from VnA:`, error);
        throw error;
    }
}

export default async function handler(req, res) {
    // Destructure query parameters
    const { query, showInCollection, showHasImages, sortOrder, resultsPerPage = 10, currentPage = 1 } = req.query;

    try {
        // Validate query parameter
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ message: 'Invalid query parameter' });
        }

        try {
            // Fetch data from both APIs
            const metResponse = await axios.get(`${MET_API_URL}/search?q=${query}`);
            const vnaResponse = await axios.get(`${VNA_API_URL}/objects/search?q=${query}`);

            const metObjectIds = metResponse.data.objectIDs || [];
            const vnaSystemNumbers = vnaResponse.data.records?.map((record) => record.systemNumber) || [];

            // Calculate pagination indices
            const startIndex = (currentPage - 1) * resultsPerPage;
            const endIndex = startIndex + parseInt(resultsPerPage, 10);

            // Fetch objects from both APIs based on the pagination
            const metObjectsPromises = metObjectIds.slice(startIndex, endIndex).map(fetchObjectMet);
            const vnaObjectsPromises = vnaSystemNumbers.slice(startIndex, endIndex).map(fetchObjectVnA);

            const metObjects = await Promise.all(metObjectsPromises);
            const vnaObjects = await Promise.all(vnaObjectsPromises);

            const allObjects = [...metObjects, ...vnaObjects].filter((obj) => obj !== null);

            let filteredResults = allObjects;

            // if (sortOrder === 'newestFirst') {
            //     filteredResults = filteredResults.sort((a, b) => {
            //         const dateA = a.objectBeginDate || a.objectDate;
            //         const dateB = b.objectBeginDate || b.objectDate;
            //         return dateB - dateA;
            //     });
            // } else {
            //     filteredResults = filteredResults.sort((a, b) => {
            //         const dateA = a.objectBeginDate || a.objectDate;
            //         const dateB = b.objectBeginDate || b.objectDate;
            //         return dateA - dateB;
            //     });
            // }

            res.json(filteredResults);
        } catch (error) {
            console.error('Error fetching data from APIs:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

        // Add a check to ensure currentPage is a positive integer
        if (!Number.isInteger(parseInt(currentPage)) || parseInt(currentPage) <= 0) {
            return res.status(400).json({ message: 'Invalid currentPage parameter' });
        }

        // Add a check to ensure resultsPerPage is a positive integer
        if (!Number.isInteger(parseInt(resultsPerPage)) || parseInt(resultsPerPage) <= 0) {
            return res.status(400).json({ message: 'Invalid resultsPerPage parameter' });
        }

    } catch (error) {
        console.error('Error fetching data from APIs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}