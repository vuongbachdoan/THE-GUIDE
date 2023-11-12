export const validatePostContent = (data) => {
    /**
     * 
     * @param {*} data 
     * subjectCode: requestJSON.subjectCode,
     * title: requestJSON.title,
     * content: requestJSON.content,
     * @returns 
     */
    let errors = [];
    if(!data?.subjectCode) {
        errors.push('Subject is not selected.');
    }
    if(!data?.title) {
        errors.push('Title can not empty.')
    }
    if(!data?.content) {
        errors.push('Content can not empty.')
    }

    return errors;
}