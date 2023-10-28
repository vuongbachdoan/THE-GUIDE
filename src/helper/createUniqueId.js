import { v4 as uuidv4 } from 'uuid';

export const createUniqueId = async (original) => {
    let uniqueId = original.split(' ').join('-') + '-' + await uuidv4();
    return uniqueId;
}