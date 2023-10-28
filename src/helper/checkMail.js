export const checkMailLecture = (emailString) => {
    const regexPattern = /^[a-zA-Z0-9._%+-]+@fe\.edu\.vn$/;
    return regexPattern.test(emailString);
}