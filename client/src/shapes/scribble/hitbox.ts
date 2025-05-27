import type { Coordinate, BoundingBox } from '@shape/types';
import { SCRIBBLE_DEFAULTS, type ScribbleSchema } from '.';
import { rectEfficientHitbox, rectHitbox } from '@shape/rect/hitbox';
import { lineEfficientHitbox } from '@shape/line/hitbox';
import { circleEfficientHitbox, circleHitbox } from '@shape/circle/hitbox';
import { normalizeBoundingBox } from '@shape/helpers';

/**
 * @param point - the point to check if it is in the scribble bounding box
 * @returns a function that checks if the point is in the scribble bounding box
 */
export const scribbleHitbox =
  (scribble: ScribbleSchema) => (point: Coordinate) => {
    const { type, points, brushWeight } = { ...SCRIBBLE_DEFAULTS, ...scribble };

    if (type === 'erase') return false;

    const { at, width, height } = getScribbleBoundingBox(scribble)(); // first check boundingbox for efficiency

    const isInRectHitbox = rectHitbox({
      at,
      width: Math.max(width, 10), // To prevent dots from not having a hitbox: due to drawing with ctx.lineCap = "round"
      height: Math.max(height, 10), // To prevent dots from not having a hitbox: due to drawing with ctx.lineCap = "round"
    });

    if (!isInRectHitbox(point)) return false;

    if (points.length === 1) {
      if (circleHitbox({ at: points[0], radius: brushWeight })(point))
        return true;
    }

    for (let i = 0; i < points.length - 1; i++) {
      const scribbleSegment = {
        start: points[i],
        end: points[i + 1],
      };

      const isInLineEfficientHitbox = lineEfficientHitbox(scribbleSegment)({
        at: point,
        width: 1,
        height: 1,
      });

      if (isInLineEfficientHitbox) return true;
    }

    return false;
  };

export const getScribbleBoundingBox = (scribble: ScribbleSchema) => () => {
  const { points, brushWeight } = {
    ...SCRIBBLE_DEFAULTS,
    ...scribble,
  };

  let minX = points[0].x;
  let minY = points[0].y;
  let maxX = points[0].x;
  let maxY = points[0].y;

  for (const point of points) {
    if (point.x < minX) minX = point.x;
    if (point.y < minY) minY = point.y;
    if (point.x > maxX) maxX = point.x;
    if (point.y > maxY) maxY = point.y;
  }

  return normalizeBoundingBox({
    at: {
      x: minX - brushWeight / 2,
      y: minY - brushWeight / 2,
    },
    width: maxX - minX + brushWeight,
    height: maxY - minY + brushWeight,
  });
};

export const scribbleEfficientHitbox =
  (scribble: ScribbleSchema) => (boxToCheck: BoundingBox) => {
    if (scribble.type === 'erase') return false;

    const { at, width, height } = getScribbleBoundingBox(scribble)();

    const isInRectEfficientHitbox = rectEfficientHitbox({
      at,
      width: Math.max(width, 10), // To prevent dots from not having a hitbox: due to drawing with ctx.lineCap = "round"
      height: Math.max(height, 10), // To prevent dots from not having a hitbox: due to drawing with ctx.lineCap = "round"
    });

    const { points, brushWeight } = { ...SCRIBBLE_DEFAULTS, ...scribble };

    if (points.length === 1) {
      if (
        circleEfficientHitbox({
          at: points[0],
          radius: brushWeight,
        })(boxToCheck)
      )
        return true;
    }

    if (!isInRectEfficientHitbox(boxToCheck)) return false;

    for (let i = 0; i < points.length - 1; i++) {
      const scribbleSegment = {
        start: points[i],
        end: points[i + 1],
      };

      const isInLineEfficientHitbox =
        lineEfficientHitbox(scribbleSegment)(boxToCheck);

      if (isInLineEfficientHitbox) return true;
    }

    return false;
  };
