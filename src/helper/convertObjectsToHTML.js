export const convertObjectsToHTML = (arrObjects) => {
    // Initialize an empty string to hold the HTML
    let html = '';

    // Loop over each object in the array
    arrObjects.forEach(obj => {
        // Append a string representing an HTML element to the HTML string
        html += `<${obj.tag} class="ignore_lib">${obj.content}</${obj.tag}>`;
    });

    // Return the HTML string
    return html;
}
