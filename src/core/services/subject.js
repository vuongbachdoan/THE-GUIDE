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
    const response = await axios.post('https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/subjects', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const getSubjects = async () => {
    const response = await axios.get('https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/subjects', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getSubjectsJoined = async (userId) => {
    const response = await axios.get(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/subjects/joined/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const getSubject = async (subjectId) => {
    const response = await axios.get(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/subjects/${subjectId}`, {
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
    const response = await axios.put(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/subjects/${subjectId}`, participantData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const updateSubject = async (subjectData) => {
    const response = await axios.patch(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/subjects/${subjectData.subjectCode}`, subjectData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

export const leaveSubject = async (subjectCode, userId) => {
    const response = await axios.delete(`https://idc43jsr1c.execute-api.us-east-1.amazonaws.com/subjects/${subjectCode}/leave/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}