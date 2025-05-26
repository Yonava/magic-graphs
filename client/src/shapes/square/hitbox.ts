import type { Coordinate, BoundingBox } from '@shape/types';
import { SQUARE_DEFAULTS, type SquareSchema } from '.';
import {
  rectHitbox,
  rectEfficientHitbox,
  getRectBoundingBox,
} from '@shape/rect/hitbox';

/**
 * @param point - the point to check if it is in the square
 * @returns a function that checks if the point is in the square
 */
export const squareHitbox = (square: SquareSchema) => {
  const { at, size, borderRadius, rotation, stroke } = {
    ...SQUARE_DEFAULTS,
    ...square,
  };
  const isInRect = rectHitbox({
    at,
    width: size,
    height: size,
    borderRadius,
    rotation,
    stroke,
  });

  return (point: Coordinate) => isInRect(point);
};

export const getSquareBoundingBox = (square: SquareSchema) => getRectBoundingBox({
  at: square.at,
  width: square.size,
  height: square.size,
});

export const squareEfficientHitbox = (square: SquareSchema) => {
  const isInRectEfficientHitbox = rectEfficientHitbox({
    at: square.at,
    width: square.size,
    height: square.size,
  });

  return (boxToCheck: BoundingBox) => isInRectEfficientHitbox(boxToCheck);
};
