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
    const response = await axios.get('https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/notifications', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const getMyNotifications = async () => {
    const response = await axios.get('https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/notifications', {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const deleteMyNotification = async (notificationId) => {
    const response = await axios.delete(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/notifications/${notificationId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}
