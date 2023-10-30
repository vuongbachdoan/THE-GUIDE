export const extractCode = (email) => {
    let match;
    match = email.match(/(.+)@fe\.edu\.vn$/);
    if (match) {
        return match[1];
    }
    // If not, check if it's a student email
    match = email.match(/.{8}@fpt\.edu\.vn$/);
    if (match) {
        return match[0].substring(0, 8);
    }
    return '';
}
