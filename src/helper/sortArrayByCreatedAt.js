export const sortArrayByCreatedAt = (arr) => {
    return arr.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
}
