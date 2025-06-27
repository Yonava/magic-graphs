import type { Coordinate, BoundingBox } from '@shape/types/utility';
import { normalizeBoundingBox } from '@shape/helpers';
import type { ScribbleSchemaWithDefaults } from './defaults';
import { circle } from '@shapes/circle';
import { rect } from '@shapes/rect';
import { line } from '@shapes/line';

/**
 * @param point - the point to check if it is in the scribble bounding box
 * @returns a function that checks if the point is in the scribble bounding box
 */
export const scribbleHitbox = (
  schema: ScribbleSchemaWithDefaults
) => (point: Coordinate) => {
  const { type, points, brushWeight } = schema;

  if (type === 'erase') return false;

  // first check boundingbox for efficiency
  const { at, width, height } = getScribbleBoundingBox(schema)();

  const { hitbox } = rect({
    at,
    // To prevent dots from not having a hitbox: due to drawing with ctx.lineCap = "round"
    width: Math.max(width, brushWeight),
    height: Math.max(height, brushWeight),
  });

  if (!hitbox(point)) return false;

  if (points.length === 1) {
    const { hitbox } = circle({ at: points[0], radius: brushWeight });
    if (hitbox(point)) return true;
  }

  for (let i = 0; i < points.length - 1; i++) {
    const scribbleSegment = {
      start: points[i],
      end: points[i + 1],
    };

    const { efficientHitbox } = line(scribbleSegment);

    if (efficientHitbox({
      at: point,
      width: 1,
      height: 1,
    })) return true;
  }

  return false;
};

export const getScribbleBoundingBox = (schema: ScribbleSchemaWithDefaults) => () => {
  const { points, brushWeight } = schema;

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

export const scribbleEfficientHitbox = (
  schema: ScribbleSchemaWithDefaults
) => (boxToCheck: BoundingBox) => {
  if (schema.type === 'erase') return false;

  const { at, width, height } = getScribbleBoundingBox(schema)();
  const { points, brushWeight } = schema;

  const { efficientHitbox } = rect({
    at,
    // To prevent dots from not having a hitbox: due to drawing with ctx.lineCap = "round"
    width: Math.max(width, brushWeight),
    height: Math.max(height, brushWeight),
  });

  if (points.length === 1) {
    const { efficientHitbox } = circle({
      at: points[0],
      radius: brushWeight,
    })
    return efficientHitbox(boxToCheck);
  }

  if (!efficientHitbox(boxToCheck)) return false;

  for (let i = 0; i < points.length - 1; i++) {
    const scribbleSegment = {
      start: points[i],
      end: points[i + 1],
    };

    const { efficientHitbox } = line(scribbleSegment);
    if (efficientHitbox(boxToCheck)) return true;
  }

  return false;
};
