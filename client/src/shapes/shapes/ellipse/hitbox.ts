import { rectEfficientHitbox } from '@shape/shapes/rect/hitbox';
import { normalizeBoundingBox } from '@shape/helpers';
import type { EllipseSchema } from '.';
import type { BoundingBox, Coordinate } from '@shape/types/utility';

export const ellipseHitbox = (ellipse: EllipseSchema) => (point: Coordinate) => {
  const { at, stroke, radiusX, radiusY } = ellipse

  const dx = point.x - at.x;
  const dy = point.y - at.y;

  const strokeWidth = stroke?.lineWidth ?? 0

  const radiusXWithStroke = radiusX + strokeWidth / 2;
  const radiusYWithStroke = radiusY + strokeWidth / 2;

  const inEllipse =
    (dx ** 2) / (radiusXWithStroke ** 2) + (dy ** 2) / (radiusYWithStroke ** 2) <= 1;

  return inEllipse;
};

export const getEllipseBoundingBox = (ellipse: EllipseSchema) => () => {
  const { at, radiusX, radiusY, stroke } = ellipse;

  const borderWidth = stroke?.lineWidth ?? 0

  return normalizeBoundingBox({
    at: {
      x: at.x - (radiusX + borderWidth / 2),
      y: at.y - (radiusY + borderWidth / 2),
    },
    width: 2 * radiusX + borderWidth,
    height: 2 * radiusY + borderWidth,
  });
};

export const ellipseEfficientHitbox = (ellipse: EllipseSchema) => {
  const ellipseBoundingBox = getEllipseBoundingBox(ellipse)();

  const isInRectEfficientHitbox = rectEfficientHitbox(ellipseBoundingBox);

  return (boxToCheck: BoundingBox) => isInRectEfficientHitbox(boxToCheck);
};
