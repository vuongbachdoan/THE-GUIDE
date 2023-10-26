import axios from 'axios';

export const createComment = async (data) => {
    const response = await axios.post('https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/comments', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const getCommentDetail = async (commentId) => {
    const response = await axios.get(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/comments/${commentId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}
