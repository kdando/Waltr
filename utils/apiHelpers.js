// util/apiHelpers.js

// FUNCTION TO COMPARE TWO DATES HANDLING VARIOUS FORMATS
function compareDates(dateA, dateB) {
    const parsedA = parseDate(dateA);
    const parsedB = parseDate(dateB);

    if (parsedA < parsedB) return -1;
    if (parsedA > parsedB) return 1;
    return 0;
}

//FUNCTION TO PARSE USEABLE DATE FROM A STRING AND GIVE US THE EARLIEST POSSIBLE YEAR
function parseDate(dateString) {
    if (!dateString) return Number.NEGATIVE_INFINITY;

    const yearPattern = /\b(\d{4})\b/;
    const centuryPattern = /(\d+)(st|nd|rd|th)\s+century/i;

    const yearMatch = dateString.match(yearPattern);
    if (yearMatch) {
        return parseInt(yearMatch[1], 10);
    }

    const centuryMatch = dateString.match(centuryPattern);
    if (centuryMatch) {
        const century = parseInt(centuryMatch[1], 10);
        return (century - 1) * 100; // Return the start of the century
    }

    return Number.NEGATIVE_INFINITY; // If we can't parse it return the earliest possible
}

// FUNCTION TO GENERATE STRING DESCRIBING PERIOD BASED ON TWO DATES
function describePeriod(earliestDate, latestDate) {

    const getCenturyDescription = (year) => {
        const century = Math.floor(year / 100) + 1;
        const yearInCentury = year % 100;
        let timePeriod;

        if (yearInCentury < 40) {
            timePeriod = "Early";
        } else if (yearInCentury < 60) {
            timePeriod = "Mid";
        } else {
            timePeriod = "Late";
        }

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
    if (!earliestDate) return `Up to ${getCenturyDescription(new Date(latestDate).getFullYear())}`;
    if (!latestDate) return `From ${getCenturyDescription(new Date(earliestDate).getFullYear())}`;

    const earliestYear = new Date(earliestDate).getFullYear();
    const latestYear = new Date(latestDate).getFullYear();

    const earliestDesc = getCenturyDescription(earliestYear);
    const latestDesc = getCenturyDescription(latestYear);

    if (earliestDesc === latestDesc) {
        return earliestDesc;
    } else if (earliestDesc.split(" ")[1] === latestDesc.split(" ")[1]) {
        return earliestDesc.split(" ")[1] + " Century";
    } else {
        return `${earliestDesc} to ${latestDesc}`;
    }
}
///////////////////////////




export { describePeriod, parseDate, compareDates };