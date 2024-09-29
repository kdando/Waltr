// pages/api/search.js

import axios from 'axios';
import { describePeriod, parseDate, compareDates, constructMetApiUrl, constructVnAApiUrl, constructIIIFThumbnailURL, constructIIIFFullResURLs } from '@/utils/apiHelpers';

// CONSTANTS
export const API_URLS = {
    MET: 'https://collectionapi.metmuseum.org/public/collection/v1',
    VNA: 'https://api.vam.ac.uk/v2',
};

const VNA_MAX_PAGE_SIZE = 100;

//// Functions to normalise API results to expected shape //////////////////////////////////////////////////////
function normaliseMetObject(data) {
    const objectImages = [data.primaryImage, ...data.additionalImages];

    return {
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
}

function normaliseVnAObject(data, systemNumber) {

    let primaryImageSmall = "";
    let objectImages = [];

    // Check if there are images
    if (data.images.length > 0) {
        primaryImageSmall = constructIIIFThumbnailURL(data.images[0]);
        objectImages = constructIIIFFullResURLs(data.images);
    }

    // const objectImages = data.images.length > 0 ? constructIIIFImageURLs(data.images) : [];
    const objectPeriod = (data.productionDates[0]?.date?.earliest && data.productionDates[0]?.date?.latest)
        ? describePeriod(data.productionDates[0].date.earliest, data.productionDates[0].date.latest)
        : "";

    return {
        objectID: systemNumber,
        title: data.titles[0]?.title || '',
        objectName: data.objectType || '',
        objectDate: data.productionDates[0]?.date?.text || '',
        culture: data.placesOfOrigin?.[0]?.place?.text || '',
        period: objectPeriod,
        briefDescription: data.briefDescription || '',
        repository: 'Victoria and Albert Museum, London',
        objectURL: `https://collections.vam.ac.uk/item/${data.systemNumber}/`,
        primaryImageSmall: primaryImageSmall.length > 0 ? primaryImageSmall : null,
        objectImages: objectImages.length > 0 ? objectImages : null
    };
}

// Functions to fetch individual records from each API //////////////////////////////////////////////////////////
async function fetchObjectMet(objectId) {
    try {
        const result = await axios.get(`${API_URLS.MET}/objects/${objectId}`);
        if (result.data.message === 'Not a valid object') return null;
        return normaliseMetObject(result.data);
    } catch (error) {
        console.error(`Error fetching object ID ${objectId} from MET:`, error);
        return null;
    }
}

async function fetchObjectVnA(systemNumber) {
    try {
        const response = await axios.get(`${API_URLS.VNA}/museumobject/${systemNumber}`);
        if (response.data.detail === 'Not Found') return null;
        return normaliseVnAObject(response.data.record, systemNumber);
    } catch (error) {
        console.error(`Error fetching data for systemNumber: ${systemNumber} from VnA:`, error);
        throw error;
    }
}

// Main handler function to manage the search and return results //////////////////////////////////////////////////////////
export default async function handler(req, res) {
    const {
        searchTerm,
        showInCollection,
        showHasImages,
        sortOrder,
        searchByCultureOrPlace,
        resultsPerPage = 10,
        currentPage = 1,
        fromYear,
        toYear
    } = req.query;

    // Input validation
    if (!searchTerm || typeof searchTerm !== 'string') {
        return res.status(400).json({ message: 'Invalid query parameter' });
    }

    const parsedCurrentPage = parseInt(currentPage, 10);
    const parsedResultsPerPage = parseInt(resultsPerPage, 10);

    if (!Number.isInteger(parsedCurrentPage) || parsedCurrentPage <= 0) {
        return res.status(400).json({ message: 'Invalid currentPage parameter' });
    }

    if (!Number.isInteger(parsedResultsPerPage) || parsedResultsPerPage <= 0) {
        return res.status(400).json({ message: 'Invalid resultsPerPage parameter' });
    }


    // getting date ranges, with defaults if only one of either supplied
    const currentYear = new Date().getFullYear();
    let effectiveFromYear = fromYear ? parseInt(fromYear) : null;
    let effectiveToYear = toYear ? parseInt(toYear) : null;

    if (effectiveFromYear !== null && effectiveToYear === null) {
        effectiveToYear = currentYear;
    } else if (effectiveToYear !== null && effectiveFromYear === null) {
        effectiveFromYear = -200000;
    }

    // Calculating V&A pagination parameters
    const vnaPageSize = Math.min(parsedResultsPerPage, VNA_MAX_PAGE_SIZE);
    const vnaPage = Math.floor((parsedCurrentPage - 1) * parsedResultsPerPage / vnaPageSize) + 1;

    // Building API URLs
    const metApiUrl = constructMetApiUrl(searchTerm, searchByCultureOrPlace, showHasImages, effectiveFromYear, effectiveToYear);
    const vnaApiUrl = constructVnAApiUrl(searchTerm, searchByCultureOrPlace, showHasImages, effectiveFromYear, effectiveToYear, sortOrder, vnaPageSize, vnaPage);

    try {
        // Fetch initial results
        const [metResponse, vnaResponse] = await Promise.all([
            axios.get(metApiUrl),
            axios.get(vnaApiUrl)
        ]);

        const metObjectIds = metResponse.data.objectIDs || [];
        const vnaSystemNumbers = vnaResponse.data.records?.map((record) => record.systemNumber) || [];

        // Calculate total number of results
        const totalResults = metObjectIds.length + vnaResponse.data.info.record_count;

        // Calculate the number of results to fetch from each API
        const metResultsToFetch = Math.min(parsedResultsPerPage, metObjectIds.length);
        const vnaResultsToFetch = Math.min(parsedResultsPerPage - metResultsToFetch, vnaSystemNumbers.length);

        // Calculate start and end indices for Met results
        const metStartIndex = (parsedCurrentPage - 1) * metResultsToFetch;
        const metEndIndex = metStartIndex + metResultsToFetch;

        // Calculate start and end indices for V&A results
        const vnaStartIndex = (parsedCurrentPage - 1) * vnaResultsToFetch;
        const vnaEndIndex = vnaStartIndex + vnaResultsToFetch;

        // Fetch detailed records
        const metObjects = await Promise.all(metObjectIds.slice(metStartIndex, metEndIndex).map(fetchObjectMet));
        const vnaObjects = await Promise.all(vnaSystemNumbers.slice(vnaStartIndex, vnaEndIndex).map(fetchObjectVnA));

        // Combine, filter, and sort them
        const allObjects = [...metObjects, ...vnaObjects].filter((obj) => obj !== null);

        if (sortOrder === 'oldestFirst' || sortOrder === 'newestFirst') {
            allObjects.sort((a, b) => {
                const comparison = compareDates(a.objectDate, b.objectDate);
                return sortOrder === 'oldestFirst' ? comparison : -comparison;
            });
        }

        // Calculate total pages
        const totalPages = Math.ceil(totalResults / parsedResultsPerPage);

        // RETURN THE PROCESSED RESULTS WITH PAGINATION INFO
        res.json({
            results: allObjects,
            pagination: {
                currentPage: parsedCurrentPage,
                totalPages: totalPages,
                totalResults: totalResults,
                resultsPerPage: parsedResultsPerPage
            }
        });

    } catch (error) {
        console.error('Error fetching data from APIs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}