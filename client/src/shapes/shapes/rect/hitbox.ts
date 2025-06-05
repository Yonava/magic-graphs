import type { RectSchema } from '.';
import { RECT_SCHEMA_DEFAULTS } from '.';
import { circle } from '@shape/shapes/circle';
import { normalizeBoundingBox, rotatePoint } from '@shape/helpers';
import type { BoundingBox, Coordinate } from '@shape/types/utility';
import { STROKE_DEFAULTS } from '@shape/defaults';

/**
 * @param point - the point to check if it is in the rotated rectangle
 * @returns a function that checks if the point is in the rotated rectangle with rounded corners
 */
export const rectHitbox = (rectangle: RectSchema) => (point: Coordinate) => {
  const { at, width, height, borderRadius, rotation, stroke } = {
    ...RECT_SCHEMA_DEFAULTS,
    ...rectangle,
  };

  const {
    at: normalizedAt,
    width: normalizedWidth,
    height: normalizedHeight,
  } = normalizeBoundingBox({ at, width, height });

  const centerX = normalizedAt.x + normalizedWidth / 2;
  const centerY = normalizedAt.y + normalizedHeight / 2;
  const strokeWidth = stroke?.lineWidth || STROKE_DEFAULTS.lineWidth;
  const localPoint = rotatePoint(point, { x: centerX, y: centerY }, -rotation);

  const { x, y } = {
    x: centerX - normalizedWidth / 2,
    y: centerY - normalizedHeight / 2,
  };

  if (borderRadius === undefined || borderRadius === 0) {
    return (
      localPoint.x >= x - strokeWidth / 2 &&
      localPoint.x <= x + normalizedWidth + strokeWidth / 2 &&
      localPoint.y >= y - strokeWidth / 2 &&
      localPoint.y <= y + normalizedHeight + strokeWidth / 2
    );
  }

  const radius = Math.min(
    borderRadius,
    normalizedWidth / 2,
    normalizedHeight / 2,
  );

  const verticalWidth = Math.max(normalizedWidth - 2 * radius, 0);
  const horizontalHeight = Math.max(normalizedHeight - 2 * radius, 0);

  const rectVertical = rectHitbox({
    ...rectangle,
    at: { x: x + radius, y },
    width: verticalWidth,
    height: normalizedHeight,
    borderRadius: 0,
    rotation: 0,
    stroke,
  });

  const rectHorizontal = rectHitbox({
    ...rectangle,
    at: { x, y: y + radius },
    width: normalizedWidth,
    height: horizontalHeight,
    borderRadius: 0,
    rotation: 0,
    stroke,
  });

  if (rectVertical(localPoint) || rectHorizontal(localPoint)) return true;

  const isInTopLeftCircle = circle({
    at: { x: x + radius, y: y + radius },
    radius,
    stroke,
  }).hitbox;

  const isInTopRightCircle = circle({
    at: { x: x + normalizedWidth - radius, y: y + radius },
    radius,
    stroke,
  }).hitbox;

  const isInBottomLeftCircle = circle({
    at: { x: x + radius, y: y + normalizedHeight - radius },
    radius,
    stroke,
  }).hitbox;

  const isInBottomRightCircle = circle({
    at: { x: x + normalizedWidth - radius, y: y + normalizedHeight - radius },
    radius,
    stroke,
  }).hitbox;

  return (
    isInTopLeftCircle(localPoint) ||
    isInTopRightCircle(localPoint) ||
    isInBottomLeftCircle(localPoint) ||
    isInBottomRightCircle(localPoint)
  );
};

export const getRectBoundingBox = (rectangle: RectSchema) => () => {
  const { at, width, height, stroke } = rectangle;
  const { lineWidth: strokeWidth } = stroke ?? STROKE_DEFAULTS;

  const normalizedWidth = Math.abs(width);
  const normalizedHeight = Math.abs(height);

  const adjustedX = width < 0 ? at.x + width : at.x;
  const adjustedY = height < 0 ? at.y + height : at.y;

  return normalizeBoundingBox({
    at: {
      x: adjustedX - strokeWidth / 2,
      y: adjustedY - strokeWidth / 2,
    },
    width: normalizedWidth + strokeWidth,
    height: normalizedHeight + strokeWidth,
  });
};

export const rectEfficientHitbox =
  (rectangle: RectSchema) => (boxToCheck: BoundingBox) => {
    const {
      at: shapeAt,
      width: shapeWidth,
      height: shapeHeight,
    } = getRectBoundingBox(rectangle)();

    const shapeBottomRight = {
      x: shapeAt.x + shapeWidth,
      y: shapeAt.y + shapeHeight,
    };

    const { at: boxAt, width: boxWidth, height: boxHeight } = boxToCheck;

    const boxLeft = Math.min(boxAt.x, boxAt.x + boxWidth);
    const boxRight = Math.max(boxAt.x, boxAt.x + boxWidth);
    const boxTop = Math.min(boxAt.y, boxAt.y + boxHeight);
    const boxBottom = Math.max(boxAt.y, boxAt.y + boxHeight);

    if (shapeBottomRight.x <= boxLeft || boxRight <= shapeAt.x) {
      return false;
    }

    if (shapeBottomRight.y <= boxTop || boxBottom <= shapeAt.y) {
      return false;
    }

    return true;
  };
