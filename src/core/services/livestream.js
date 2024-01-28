import axios from 'axios';

export const getIVSToken = async (username) => {
    const response = await axios.post(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/livestream/key`,
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

export const registerEvent = async (data) => {
    const response = await axios.post(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/livestream/invite`,
    data,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}