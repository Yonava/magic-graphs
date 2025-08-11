/**
 * recursively compare two objects and return the delta
 */

const isObj = (obj: any) =>
  Object.prototype.toString.call(obj) === '[object Object]';

/**
 * gets the delta between two objects
 *
 * @param oldObject
 * @param newObject
 * @returns an object with only the changes, the values are the new values
 */
export const delta = (
  oldObject: Record<any, any>,
  newObject: Record<any, any>,
) => {
  const output: Record<any, any> = {};

  if (!oldObject) return newObject;
  if (!newObject) return null;

  const oldObjectKeys = Object.keys(oldObject);
  const newObjectKeys = Object.keys(newObject);

  for (const key of newObjectKeys) {
    if (!oldObjectKeys.includes(key)) {
      output[key] = newObject[key];
    }
  }

  for (const key of oldObjectKeys) {
    if (isObj(oldObject[key])) {
      const diffObj = delta(oldObject[key], newObject[key]);
      if (diffObj) output[key] = diffObj;
      continue;
    }

    if (Array.isArray(oldObject[key])) {
      if (JSON.stringify(oldObject[key]) !== JSON.stringify(newObject[key]))
        output[key] = newObject[key];
      continue;
    } else if (oldObject[key] !== newObject[key]) output[key] = newObject[key];
  }

  return Object.keys(output).length ? output : null;
};
