// recursively compare two objects and return the delta

// -----------------

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

/**
 * Computes the shallow difference between two objects.
 * Returns a new object containing only the keys from obj2 that have changed
 * compared to obj1, using the values from obj2.
 */
export const shallowDelta = <T extends Record<string, any>>(
  obj1: T,
  obj2: T
): Partial<T> => {
  const difference: Partial<T> = {};

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      // If the value in obj2 is different from obj1, capture it
      if (obj1[key] !== obj2[key]) {
        difference[key] = obj2[key];
      }
    }
  }

  return difference;
};
