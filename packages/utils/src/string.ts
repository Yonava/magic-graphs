/**
 * makes the first letter of a string uppercase
 *
 * @param str - the string to capitalize
 * @returns the capitalized string
 * @example capitalize('hello') // 'Hello'
 */
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * turns a camelCase string into a title case string
 *
 * @param str - the string to convert
 * @returns the title case string
 * @example camelCaseToTitleCase('camelCase') // 'Camel Case'
 */
export const camelCaseToTitleCase = (str: string) => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return capitalize(result);
};
/**
 * turns an array of strings into a comma separated list with 'and' before the last item
 * @example toCommaList(['a', 'b', 'c']) // 'a, b and c'
 */
export const getCommaList = (arr: string[]) => {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  const last = arr.pop();
  return arr.join(', ') + ' and ' + last;
};
