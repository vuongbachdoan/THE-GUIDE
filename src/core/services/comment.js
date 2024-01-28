import axios from 'axios';

export const createComment = async (data) => {
    const response = await axios.post('https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/comments', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const getCommentDetail = async (commentId) => {
    const response = await axios.get(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/comments/${commentId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}
