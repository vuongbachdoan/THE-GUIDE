import axios from 'axios';

export const getIVSToken = async (username) => {
    const response = await axios.post(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/livestream/key`,
    {
        username: username
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}