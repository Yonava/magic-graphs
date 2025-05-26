import { normalizeBoundingBox } from '@shape/helpers';
import { CROSS_SCHEMA_DEFAULTS } from '.';
import type { CrossSchema } from '.';
import { rectHitbox, rectEfficientHitbox } from '@shape/rect/hitbox';
import type { Coordinate, BoundingBox } from '@shape/types';

/**
 * @param point - the point to check if it is in the cross
 * @returns a function that checks if the point is in the cross
 */
export const crossHitbox = (cross: CrossSchema) => {
  const { at, size, rotation, lineWidth, borderRadius } = {
    ...CROSS_SCHEMA_DEFAULTS,
    ...cross,
  };

  const halfLineWidth = lineWidth / 2;

  const horizontalHitbox = rectHitbox({
    at: { x: at.x - size / 2, y: at.y - halfLineWidth },
    width: size,
    height: lineWidth,
    rotation,
    borderRadius,
  });
  const verticalHitbox = rectHitbox({
    at: { x: at.x - halfLineWidth, y: at.y - size / 2 },
    width: lineWidth,
    height: size,
    rotation,
    borderRadius,
  });

  return (point: Coordinate) =>
    horizontalHitbox(point) || verticalHitbox(point);
};

export const getCrossBoundingBox = (cross: CrossSchema) => () => {
  const { at, size } = cross;

  return normalizeBoundingBox({
    at: {
      x: at.x - size / 2,
      y: at.y - size / 2,
    },
    width: size,
    height: size,
  });
};

export const crossEfficientHitbox = (cross: CrossSchema) => {
  const crossBoundingBox = getCrossBoundingBox(cross)();

  const isInRectEfficientHitbox = rectEfficientHitbox(crossBoundingBox);
  return (boxToCheck: BoundingBox) => isInRectEfficientHitbox(boxToCheck);
};
