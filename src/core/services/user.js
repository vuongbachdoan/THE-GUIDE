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
    const response = await axios.post('https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/users', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const getUsers = async () => {
    const response = await axios.get('https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/users', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getUser = async (userId) => {
    const response = await axios.get(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/users/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const updateUser = async (userData) => {
    const response = await axios.patch(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/users/${userData.id}`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}