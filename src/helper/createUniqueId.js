import { v4 as uuidv4 } from 'uuid';

export const createUniqueId = (original) => {
    let uniqueId = original.split(' ').join('-') + '-' + uuidv4();
    return uniqueId;
}