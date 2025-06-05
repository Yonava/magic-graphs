import { rectEfficientHitbox } from '@shape/shapes/rect/hitbox';
import { normalizeBoundingBox } from '@shape/helpers';
import type { EllipseSchema } from '.';
import type { BoundingBox, Coordinate } from '@shape/types/utility';
import { STROKE_DEFAULTS } from '@shape/defaults';

export const ellipseHitbox = (ellipse: EllipseSchema) => (point: Coordinate) => {
  const dx = point.x - ellipse.at.x;
  const dy = point.y - ellipse.at.y;

  const stroke = {
    ...STROKE_DEFAULTS,
    ...ellipse.stroke,
  };

  const radiusX = ellipse.radiusX + stroke.lineWidth / 2;
  const radiusY = ellipse.radiusY + stroke.lineWidth / 2;

  const inEllipse =
    (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1;

  return inEllipse;
};

export const getEllipseBoundingBox = (ellipse: EllipseSchema) => () => {
  const { at, radiusX, radiusY } = ellipse;

  const { lineWidth: borderWidth } = {
    ...STROKE_DEFAULTS,
    ...ellipse.stroke,
  };

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
