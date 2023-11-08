export const convertHtmlToObject = (htmlString) => {
    // Regular expression to match the tags and their content
    var regex = /<(h1|h2|h3|h4|h5|h6|p|i|u|b)[^>]*>(.*?)<\/\1>/g;

    // Initialize an empty array to hold the objects
    var objects = [];

    // Use the regular expression to match the tags and their content
    var match;
    while ((match = regex.exec(htmlString)) !== null) {
        // Create a new object with the tag and content attributes
        var obj = {
            tag: match[1],
            content: match[2]
        };

        // Add the object to the array
        objects.push(obj);
    }

    // Return the array of objects
    return objects;
}