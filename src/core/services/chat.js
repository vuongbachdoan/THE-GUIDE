import axios from 'axios';

export const generateChatKey = async (data) => {
    const response = await axios.post('https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/livestream/key', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}