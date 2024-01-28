import axios from 'axios';

export const updateUserAvatar = async (userId, image, type) => {
    const data = {
        image: image, // base64
        type: type
    };

    const response = await axios.post(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/users/${userId}/avatar`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const updatePostCover = async (userId, image, type) => {
    const data = {
        image: image, // base64
        type: type
    };

    const response = await axios.post(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/posts/${userId}/cover`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const updateSubjectThumbnail = async (subjectCode, image, type) => {
    const data = {
        image: image, // base64
        type: type
    };

    console.log(subjectCode)

    const response = await axios.post(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/subjects/${subjectCode}/thumbnail`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}