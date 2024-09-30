import DOMPurify from 'dompurify';

// FUNCTIONS TO DEAL WITH POTENTIAL HTML IN OBJECT RECORD DETAILS

// process and sanitise a string with potential HTML in it
const sanitiseHTML = (rawHtmlString) => {
    return DOMPurify.sanitize(rawHtmlString);
};

// returns an object version of the string with sanitised html
const renderHTML = (htmlString) => {
    return { __html: sanitiseHTML(htmlString) };
};


export { sanitiseHTML, renderHTML };