import axios from 'axios';

/**
 * 
 * @param {*} data 
 * id: requestJSON.id,
 * subjectCode: requestJSON.subjectCode,
 * department: requestJSON.department,
 * title: requestJSON.title,
 * description: requestJSON.description,
 * creatorId: requestJSON.creatorId,
 * createAt: requestJSON.createAt,
 * updatedAt: requestJSON.updatedAt,
 * content: requestJSON.content,
 * status: requestJSON.status,
 * liked: requestJSON.liked,
 * commentIds: requestJSON.commentIds,
 * shared: requestJSON.shared,
 * viewed: requestJSON.viewed
 * @returns 
 */
export const createPost = async (data) => {
    const response = await axios.post('https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/posts', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const getPosts = async () => {
    const response = await axios.get('https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/posts', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getPost = async (postId) => {
    const response = await axios.get(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/posts/${postId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const updatePost = async (postData) => {
    const response = await axios.patch(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/posts/${postData.id}`, postData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getMyPosts = async (userId) => {
    const response = await axios.get(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/users/${userId}/posts`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getMyFilteredPosts = async (userId, type) => {
    const response = await axios.get(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/users/${userId}/posts/filter/${type}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const likePost = async (postId, userId) => {
    const response = await axios.put(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/posts/${postId}/reaction`, {userId: userId}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const searchPosts = async (searchVal) => {
    const response = await axios.get(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/posts/search/${searchVal}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getPostsBelongSubject = async (subjectCode) => {
    const response = await axios.get(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/posts/of/${subjectCode}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const approvePost = async (postId, data) => {
    const response = await axios.put(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/posts/${postId}/approve`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const deletePost = async (postId) => {
    const response = await axios.delete(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/posts/${postId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}