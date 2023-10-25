import axios from 'axios';

export const updateUserAvatar = async (userId, image, type) => {
    const data = {
        image: image, // base64
        type: type
    };

    const response = await axios.post(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/users/${userId}/avatar`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}