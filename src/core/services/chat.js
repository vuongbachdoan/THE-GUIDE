import axios from 'axios';

export const generateChatKey = async (data) => {
    const response = await axios.post('https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/livestream/key', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}