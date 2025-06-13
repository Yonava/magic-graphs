import { toBorderRadiusArray, normalizeBoundingBox } from '@shape/helpers';
import { CROSS_SCHEMA_DEFAULTS } from '.';
import type { CrossSchema } from '.';
import { rectHitbox, rectEfficientHitbox } from '@shape/shapes/rect/hitbox';
import type { Coordinate, BoundingBox } from '@shape/types/utility';

/**
 * @param point - the point to check if it is in the cross
 * @returns a function that checks if the point is in the cross
 */
export const crossHitbox = (cross: CrossSchema) => {
  const { at, size, lineWidth, borderRadius, ...rest } = {
    ...CROSS_SCHEMA_DEFAULTS,
    ...cross,
  };
  const halfLineWidth = lineWidth / 2;

  const [topLeft, topRight, bottomLeft, bottomRight] =
    toBorderRadiusArray(borderRadius);

  const horizontalHitbox = rectHitbox({
    ...rest,
    at: { x: at.x - size / 2, y: at.y - halfLineWidth },
    width: size,
    height: lineWidth,
    borderRadius: [bottomRight, topRight, topRight, bottomRight],
  });

  const verticalHitbox = rectHitbox({
    ...rest,
    at: { x: at.x - halfLineWidth, y: at.y - size / 2 },
    width: lineWidth,
    height: size,
    borderRadius: [topLeft, topLeft, bottomLeft, bottomLeft],
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
