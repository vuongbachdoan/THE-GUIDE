import axios from 'axios';

export const AIChat = async (data) => {
    const response = await axios.post('https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/ai', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}