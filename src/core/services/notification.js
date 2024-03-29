import axios from 'axios';

/**
 * 
 * @param {*} data 
 *  {
 *   "id": "583376784",
 *   "message": "You have a new comment on your post",
 *   "type": "comment",
 *   "receiver": "vuongbachdoan@gmail.com",
 *   "createAt": "2023-10-31T13:07:36Z"
 *   }
 * @returns 
 */
export const postMyNotification = async (data) => {
    const response = await axios.post('https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/notifications', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const getMyNotifications = async (userId) => {
    const response = await axios.get(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/notifications/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const deleteMyNotification = async (notificationId) => {
    const response = await axios.delete(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/notifications/${notificationId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}
