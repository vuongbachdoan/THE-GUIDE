export const sortArrayByCreatedAt = (arr) => {
    let temp = [...arr];
    return temp.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
}
