/**
 * Nearest rank percentile over an unsorted sample set.
 *
 * Nearest rank rather than interpolated: every value returned is a frame that
 * actually happened, which is the right property when the number is going to be
 * read as "a frame took this long".
 */
export const percentile = (samples: number[], fraction: number) => {
  if (samples.length === 0) return 0;

  const sorted = samples.toSorted((a, b) => a - b);
  const rank = Math.ceil(fraction * sorted.length);
  const index = Math.min(Math.max(rank - 1, 0), sorted.length - 1);

  return sorted[index];
};
