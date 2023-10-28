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

export const updatePostCover = async (userId, image, type) => {
    const data = {
        image: image, // base64
        type: type
    };

    const response = await axios.post(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/posts/${userId}/cover`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const updateSubjectThumbnail = async (subjectCode, image, type) => {
    console.log({
        subjectCode: subjectCode,
        image: image,
        type: type
    })
    const data = {
        image: image, // base64
        type: type
    };

    const response = await axios.post(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/subjects/${subjectCode}/thumbnail`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}