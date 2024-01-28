import axios from 'axios';

/**
 * 
 * @param {*} data 
 * subjectCode: requestJSON.subjectCode,
 * subjectName: requestJSON.subjectName,
 * thumbnail: requestJSON.thumbnail,
 * studentIds: requestJSON.studentIds,
 * lectureIds: requestJSON.lectureIds,
 * postIds: requestJSON.postIds,
 * createAt: requestJSON.createAt,
 * @returns 
 */
export const createSubject = async (data) => {
    console.log(data)
    const response = await axios.post('https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/subjects', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const getSubjects = async () => {
    const response = await axios.get('https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/subjects', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getSubjectsJoined = async (userId) => {
    const response = await axios.get(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/subjects/joined/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getSubject = async (subjectId) => {
    const response = await axios.get(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/subjects/${subjectId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

/**
 * @param 
 * subjectId: string
 * {
 *  email: string
 *  id: string
 * }
 */
export const joinSubject = async (subjectId, participantData) => {
    const response = await axios.put(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/subjects/${subjectId}`, participantData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const updateSubject = async (subjectData) => {
    const response = await axios.patch(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/subjects/${subjectData.subjectCode}`, subjectData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const leaveSubject = async (subjectCode, userId) => {
    const response = await axios.delete(`https://ldq5ny42ob.execute-api.us-east-1.amazonaws.com/prod/subjects/${subjectCode}/leave/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}