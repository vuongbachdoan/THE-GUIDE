
import AWS from 'aws-sdk';

export const createChatToken = async (params) => {
    const ivs = new AWS.Ivschat();
    const result = await ivs.createChatToken(params).promise();
    return result.token;
}


