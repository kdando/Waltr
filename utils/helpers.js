import DOMPurify from 'dompurify';

// FUNCTIONS TO DEAL WITH POTENTIAL HTML IN OBJECT RECORD DETAILS

// process and sanitise a string with potential HTML in it
// if not in browser DOM is unavailable so return raw string to avoid error (this deals with SSR)
const isBrowser = typeof window !== 'undefined';

const sanitiseHTML = (rawHtmlString) => {
    if (isBrowser) {
        return DOMPurify.sanitize(rawHtmlString);
    }
    return rawHtmlString;
};

// returns an object version of the string with sanitised html
const renderHTML = (htmlString) => {
    return { __html: sanitiseHTML(htmlString) };
};


export { sanitiseHTML, renderHTML };