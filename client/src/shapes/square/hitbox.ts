import type { Coordinate, BoundingBox } from '@shape/types';
import { SQUARE_SCHEMA_DEFAULTS, type SquareSchema } from '.';
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
  const { size, ...rest } = {
    ...SQUARE_SCHEMA_DEFAULTS,
    ...square,
  };
  const isInRect = rectHitbox({
    ...rest,
    width: size,
    height: size,
  });

  return (point: Coordinate) => isInRect(point);
};

export const getSquareBoundingBox = (square: SquareSchema) =>
  getRectBoundingBox({
    ...square,
    width: square.size,
    height: square.size,
  });

export const squareEfficientHitbox = (square: SquareSchema) => {
  const squareBoundingBox = getSquareBoundingBox(square)();

  const isInRectEfficientHitbox = rectEfficientHitbox(squareBoundingBox);

  return (boxToCheck: BoundingBox) => isInRectEfficientHitbox(boxToCheck);
};
