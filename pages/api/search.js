// pages/api/search.js

/*
EXAMPLE IDEAL OBJECT RECORD:
This is what is currently expected by the Modal etc. It's based on what we get from MoMA's API.

{
objectId: "",
title: "",
objectName: "",
objectDate: "",
culture: "",
period: "",
repository: "",
objectURL: ""
}

*/
// pages/api/search.js

import axios from 'axios';

async function fetchObject(objectId) {
    try {
        const result = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
        if (result.data.message === "Not a valid object") {
            return null;
        }
        return result.data;
    } catch (error) {
        console.error(`Error fetching object ID ${objectId}:`, error);
        return null;
    }
}

export default async function handler(req, res) {
    const { query, showInCollection, showHasImages, sortOrder, resultsPerPage = 10, currentPage = 1 } = req.query;

    try {
        const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`);
        const objectIds = response.data.objectIDs;

        // Calculate the start and end indices for pagination
        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = startIndex + parseInt(resultsPerPage, 10);
        const paginatedObjectIds = objectIds.slice(startIndex, endIndex);

        const results = await Promise.all(paginatedObjectIds.map(fetchObject));
        const validResults = results.filter((result) => result !== null);

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