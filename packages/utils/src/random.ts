/**
 * given two numbers, this function returns a random number between them (inclusive)
 *
 * @param min - the lowest number
 * @param max - the highest number
 * @returns a random number between min and max
 */
export const getRandomInRange = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

export const getRandomPointOnCanvas = (
  canvas: HTMLCanvasElement,
  buffer = 50,
) => ({
  x: getRandomInRange(buffer, canvas.width - buffer),
  y: getRandomInRange(buffer, canvas.height - buffer),
});

/**
 * get a random element from an array
 *
 * @param array
 * @returns random element from given array
 */
export const getRandomElement = <T>(array: ArrayLike<T>) => {
  return array[Math.floor(Math.random() * array.length)];
};
