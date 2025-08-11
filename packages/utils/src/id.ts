/**
 * generates a new, random, id
 * @example generateId() // 'abc123'
 */
export const generateId = () => Math.random().toString(36).substring(2, 9);
