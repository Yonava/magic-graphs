import type { Coordinate, BoundingBox } from "@shape/types";
import type { Ellipse } from "@shape/ellipse";
import { STROKE_DEFAULTS } from "@shape/types";
import { rectEfficientHitbox } from "@shape/rect/hitbox";

export const ellipseHitbox = (ellipse: Ellipse) => (point: Coordinate) => {
  const dx = point.x - ellipse.at.x;
  const dy = point.y - ellipse.at.y;

  const stroke = {
    ...STROKE_DEFAULTS,
    ...ellipse.stroke,
  };

  const radiusX = ellipse.radiusX + stroke.width / 2;
  const radiusY = ellipse.radiusY + stroke.width / 2;

  const inEllipse =
    (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1;

  return inEllipse;
};

export const getEllipseBoundingBox = (ellipse: Ellipse) => () => {
  const { at, radiusX, radiusY } = ellipse;

  const { width: borderWidth } = {
    ...STROKE_DEFAULTS,
    ...ellipse.stroke,
  };

  return {
    at: {
      x: at.x - (radiusX + borderWidth / 2),
      y: at.y - (radiusY + borderWidth / 2),
    },
    width: 2 * radiusX + borderWidth,
    height: 2 * radiusY + borderWidth,
  };
};

export const ellipseEfficientHitbox = (ellipse: Ellipse) => {
  const ellipseBoundingBox = getEllipseBoundingBox(ellipse)();

  const isInRectEfficientHitbox = rectEfficientHitbox(ellipseBoundingBox);

  return (boxToCheck: BoundingBox) => isInRectEfficientHitbox(boxToCheck);
};
