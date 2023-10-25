export const convertTimestamp = (isoTimestamp) => {
    var now = new Date();
    var timestamp = new Date(isoTimestamp);

    var diffInMilliseconds = now - timestamp;
    var diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    var diffInMinutes = Math.floor(diffInSeconds / 60);
    var diffInHours = Math.floor(diffInMinutes / 60);
    var diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
        return "just now";
    } else if (diffInMinutes < 60) {
        return diffInMinutes + " minutes ago";
    } else if (diffInHours < 24) {
        return diffInHours + " hours ago";
    } else {
        return diffInDays + " days ago";
    }
}