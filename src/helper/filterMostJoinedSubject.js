export const filterMostJoinedSubject = (subjects) => {
    if (subjects) {
        let maxParticipants = Math.max(...subjects.map(obj => obj.studentIds.length));
        return subjects.find(obj => obj.studentIds.length === maxParticipants);
    }
    return null;
}