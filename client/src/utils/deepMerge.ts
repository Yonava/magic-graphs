

export const isPlainObject = (obj: any): obj is Record<string | number | symbol, unknown> =>
  !!obj &&
  typeof obj === 'object' &&
  Object.getPrototypeOf(obj) === Object.prototype;

/**
 * Deeply merges multiple objects. Properties from later objects overwrite those from earlier ones.
 * Non-object values (including arrays) are replaced, not merged.
 *
 * @param {...any[]} objects - Objects to merge. The rightmost object's properties take precedence.
 * @returns {any} - A new deeply merged object.
 *
 * @example
 * const result = deepMerge(
 *   { a: 1, b: { c: 2 } },
 *   { b: { d: 3 }, e: 4 }
 * );
 * // result: { a: 1, b: { c: 2, d: 3 }, e: 4 }
 */
export const deepMerge = (...objects: any[]): any => objects.reduce((acc, obj) => {
  if (obj === undefined || obj === null) return acc;

  if (!isPlainObject(obj)) return obj;

  Object.keys(obj).forEach(key => {
    if (isPlainObject(obj[key]) && isPlainObject(acc[key])) {
      acc[key] = deepMerge(acc[key], obj[key]);
    } else {
      acc[key] = obj[key];
    }
  });

  return acc;
}, {});
