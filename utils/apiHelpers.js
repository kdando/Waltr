// util/apiHelpers.js

import { API_URLS } from '@/pages/api/search';

// FUNCTION TO BUILD MET API URLS FROM SEARCH FORM PARAMS //////////////////////////////////////////////////////////
function constructMetApiUrl(searchTerm, searchByCultureOrPlace, showHasImages, fromYear, toYear) {
    let url = `${API_URLS.MET}/search?q=${searchTerm}`;
    if (searchByCultureOrPlace === "true") url += '&artistOrCulture=true';
    if (showHasImages === 'true') url += '&hasImages=true';
    if (fromYear !== null && toYear !== null) {
        url += `&dateBegin=${fromYear}&dateEnd=${toYear}`;
    }
    return url;
}

// FUNCTION TO BUILD V&A API URLS FROM SEARCH FORM PARAMS //////////////////////////////////////////////////////////
function constructVnAApiUrl(searchTerm, searchByCultureOrPlace, showHasImages, fromYear, toYear, sortOrder, pageSize, page) {
    let url = `${API_URLS.VNA}/objects/search?q=${searchTerm}`;
    if (searchByCultureOrPlace === "true") url += `&q_place_name=${searchTerm}`;
    if (showHasImages === 'true') url += '&images_exist=1';
    if (fromYear !== null && toYear !== null) {
        url += `&year_made_from=${fromYear}&year_made_to=${toYear}`;
    }
    if (sortOrder === 'oldestFirst') {
        url += '&order_by=date&order_sort=asc';
    } else if (sortOrder === 'newestFirst') {
        url += '&order_by=date&order_sort=desc';
    }
    url += `&page_size=${pageSize}&page=${page}`;
    return url;
}

// FUNCTION TO BUILD IIIF IMAGE URLS FOR V&A OBJECTS //////////////////////////////////////////////////////////
const IIIF_BASE_URL = "https://framemark.vam.ac.uk/collections/";

function constructIIIFImageURLs(imageIIIFNumbers) {
    return imageIIIFNumbers.map(imageID => `${IIIF_BASE_URL}${imageID}/full/!200,200/0/default.jpg`);
}

// FUNCTION TO COMPARE TWO DATES HANDLING VARIOUS FORMATS INCLUDING BC ///////////////////////////////////////
function compareDates(dateA, dateB) {
    const parsedA = parseDate(dateA);
    const parsedB = parseDate(dateB);
    if (parsedA < parsedB) return -1;
    if (parsedA > parsedB) return 1;
    return 0;
}

// FUNCTION TO PARSE USEABLE DATE FROM A STRING AND GIVE US THE EARLIEST POSSIBLE YEAR, HANDLING BC ////////
function parseDate(dateString) {
    if (!dateString) return Number.NEGATIVE_INFINITY;
    const bcYearPattern = /\b(\d+)\s*(BC|BCE)\b/i;
    const adYearPattern = /\b(\d+)\s*(AD|CE)?\b/;
    const centuryPattern = /(\d+)(st|nd|rd|th)\s+century\s*(BC|BCE|AD|CE)?/i;

    const bcYearMatch = dateString.match(bcYearPattern);
    if (bcYearMatch) {
        return -parseInt(bcYearMatch[1], 10);
    }

    const adYearMatch = dateString.match(adYearPattern);
    if (adYearMatch) {
        return parseInt(adYearMatch[1], 10);
    }

    const centuryMatch = dateString.match(centuryPattern);
    if (centuryMatch) {
        const century = parseInt(centuryMatch[1], 10);
        const era = centuryMatch[3] ? centuryMatch[3].toUpperCase() : 'CE';
        if (era === 'BC' || era === 'BCE') {
            return -(century - 1) * 100 - 99; // Return the start of the BC century
        } else {
            return (century - 1) * 100 + 1; // Return the start of the AD century
        }
    }

    return Number.NEGATIVE_INFINITY; // If we can't parse it return the earliest possible
}

// FUNCTION TO GENERATE STRING DESCRIBING PERIOD BASED ON TWO DATES, HANDLING BC ////////////////////////
function describePeriod(earliestDate, latestDate) {
    const getCenturyDescription = (year) => {
        const absYear = Math.abs(year);
        const century = Math.floor((absYear - 1) / 100) + 1;
        const yearInCentury = absYear % 100;
        let timePeriod;
        if (yearInCentury <= 33) {
            timePeriod = "Early";
        } else if (yearInCentury <= 66) {
            timePeriod = "Mid";
        } else {
            timePeriod = "Late";
        }
        const era = year < 0 ? "BC" : "CE";
        return `${timePeriod} ${century}${getSuffix(century)} Century`;
    };

    const getSuffix = (num) => {
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) return "st";
        if (j === 2 && k !== 12) return "nd";
        if (j === 3 && k !== 13) return "rd";
        return "th";
    };

    if (!earliestDate && !latestDate) return "Unknown period";
    if (!earliestDate) return `Up to ${getCenturyDescription(parseDate(latestDate))}`;
    if (!latestDate) return `From ${getCenturyDescription(parseDate(earliestDate))}`;

    const earliestYear = parseDate(earliestDate);
    const latestYear = parseDate(latestDate);
    const earliestDesc = getCenturyDescription(earliestYear);
    const latestDesc = getCenturyDescription(latestYear);

    if (earliestDesc === latestDesc) {
        return earliestDesc;
    } else if (earliestDesc.split(" ")[1] === latestDesc.split(" ")[1] &&
        earliestDesc.split(" ")[4] === latestDesc.split(" ")[4]) {
        return `${earliestDesc.split(" ")[1]} Century ${earliestDesc.split(" ")[4]}`;
    } else {
        return `${earliestDesc} to ${latestDesc}`;
    }
}

//////////////////////////////////////////////////////////

export { describePeriod, parseDate, compareDates, constructMetApiUrl, constructVnAApiUrl, constructIIIFImageURLs };