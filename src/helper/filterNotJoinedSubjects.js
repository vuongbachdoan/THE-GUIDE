export const filterNotJoinedsubjects = (subjects, userId) => {
    return subjects.filter(item => {
        return !(item.studentIds.includes(userId) || item.lectureIds.includes(userId));
    });
}
