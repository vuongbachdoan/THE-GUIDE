export const sortPostByLike = (arr) => {
    let temp = [...arr];
    return temp.sort((a, b) => b.liked.length - a.liked.length);
}
