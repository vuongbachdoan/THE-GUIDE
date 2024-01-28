import axios from 'axios';

export const AIChat = async (data) => {
    const response = await axios.post('https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/ai', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}