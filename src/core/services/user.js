import axios from 'axios';

/**
 * 
 * @param {*} data 
 *  id: requestJSON.id,
 *  username: requestJSON.username,
 *  email: requestJSON.email,
 *  avatar: requestJSON.avatar,
 *  socialLinks: requestJSON.socialLinks
 * @returns 
 */
export const createUser = async (data) => {
    const response = await axios.post('https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/users', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const getUsers = async () => {
    const response = await axios.get('https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/users', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getUser = async (userId) => {
    const response = await axios.get(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/users/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const updateUser = async (userData) => {
    const response = await axios.patch(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/users/${userData.id}`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const leaveUser = async (userId, subjectCode) => {
    const response = await axios.delete(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/users/${userId}/leave/${subjectCode}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}