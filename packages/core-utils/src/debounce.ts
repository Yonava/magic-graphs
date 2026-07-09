/**
 * a function that will only be called after a certain amount
 * of time has passed since the last time it was called
 *
 * @param fn target function
 * @param ms time in milliseconds
 * @returns a debounced function
 */
export const debounce = <T extends () => void>(fn: T, ms: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, ms);
  };
};
