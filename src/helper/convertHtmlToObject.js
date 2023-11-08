export const convertHtmlToObject = (htmlString) => {
    // Regular expression to match the tags and their content
    var regex = /<(h1|h2|h3|h4|h5|h6|p|i|u|b)[^>]*>(.*?)<\/\1>/g;

    // Initialize an empty array to hold the objects
    var objects = [];

    // Default CSS for HTML tags
    var defaultCss = {
        h1: { "fontSize": "2em", "fontWeight": "bold" },
        h2: { "fontSize": "1.5em", "fontWeight": "bold" },
        h3: { "fontSize": "1.17em", "fontWeight": "bold" },
        h4: { "fontSize": "1em", "fontWeight": "bold" },
        h5: { "fontSize": "0.83em", "fontWeight": "bold" },
        h6: { "fontSize": "0.67em", "fontWeight": "bold" },
        p: { "fontWeight": "normal", "fontSize": "14px" },
        i: { "fontStyle": "italic", "fontWeight": "normal", "fontSize": "14px" },
        u: { "textDecoration": "underline", "fontWeight": "normal", "fontSize": "14px" },
        b: { "fontWeight": "bold", "fontSize": "14px" }
    };

    // Use the regular expression to match the tags and their content
    var match;
    while ((match = regex.exec(htmlString)) !== null) {
        // Create a new object with the tag, content, and style attributes
        var obj = {
            tag: match[1],
            content: match[2],
            style: defaultCss[match[1]]
        };

        // Add the object to the array
        objects.push(obj);
    }

    // Return the array of objects
    return objects;
}
