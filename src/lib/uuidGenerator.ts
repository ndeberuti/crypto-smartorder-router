import { uuid } from 'uuidv4';

export const generateUUID = () => uuid().replace(/-/g,'');