export const converTextToHTML = (val, variant = 'h3') => {
    if(val == '') return '</br>';
    let tag;
    switch (variant) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'title':
        case 'p':
        case 'blockquote':
        case 'code':
            tag = variant;
            break;
        case 'italic':
            tag = 'i';
            break;
        case 'bold':
            tag = 'b';
            break;
        case 'underline':
            tag = 'u';
            break;
        default:
            tag = 'p';
    }
    return (`<${tag} class="ignore_lib">${val}</${tag}>`);
}