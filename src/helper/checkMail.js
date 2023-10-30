export const checkMailLecture = (emailString) => {
    const regexPattern = /^[a-zA-Z0-9._%+-]+@fe\.edu\.vn$/;
    return emailString === 'vuongbachdoan@gmail.com' || regexPattern.test(emailString);
}