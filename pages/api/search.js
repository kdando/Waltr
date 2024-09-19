// pages/api/search.js

import axios from 'axios';

async function fetchObject(objectId) {
    try {
        const result = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
        if (result.data.message === "Not a valid object") {
            return null; // Return null if the object is not valid
        }
        return result.data;
    } catch (error) {
        console.error(`Error fetching object ID ${objectId}:`, error);
        return null; // Return null if an error occurs
    }
}

export default async function handler(req, res) {
    const { query, showInCollection, showHasImages, sortOrder } = req.query;

    try {
        const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`);
        const objectIds = response.data.objectIDs;

        const results = await Promise.all(objectIds.map(fetchObject)); // Call the helper function to fetch each object
        const validResults = results.filter((result) => result !== null); // Filter out null results

        let filteredResults = validResults;

        if (sortOrder === 'newestFirst') {
            filteredResults = filteredResults.sort((a, b) => b.objectBeginDate - a.objectBeginDate);
        } else {
            filteredResults = filteredResults.sort((a, b) => a.objectBeginDate - b.objectBeginDate);
        }

        res.json(filteredResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}