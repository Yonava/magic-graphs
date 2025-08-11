import type { BorderRadius } from '@shape/types/schema';

export const validateBorderRadius = (options: BorderRadius) => {
  const { borderRadius } = options;
  if (borderRadius === undefined) return;
  if (typeof borderRadius === 'number') {
    if (borderRadius < 0) throw new Error('borderRadius must be positive');
  } else if (Array.isArray(borderRadius)) {
    if (borderRadius.length !== 4)
      throw new Error('borderRadius array must have exactly 4 values');
    if (borderRadius.some((r) => r < 0))
      throw new Error('borderRadius must be positive');
  } else
    throw new Error('borderRadius must be a number or an array of numbers');
};
