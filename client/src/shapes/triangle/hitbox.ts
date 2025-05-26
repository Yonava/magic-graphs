import type { Coordinate, BoundingBox } from '@shape/types';
import type { TriangleSchema } from '.';
import { rectEfficientHitbox } from '@shape/rect/hitbox';
import { lineHitbox } from '@shape/line/hitbox';
import { normalizeBoundingBox } from '@shape/helpers';

/**
 * uses barycentric coordinate system for triangles. dont ask me, im not that smart.
 * https://en.wikipedia.org/wiki/Barycentric_coordinate_system
 *
  @param {Coordinate} point - the point to check if it is in the triangle
  @returns a function that checks if the point is in the triangle
*/
export const triangleHitbox = (triangle: TriangleSchema) => (point: Coordinate) => {
  const { pointA: a, pointB: b, pointC: c, stroke } = triangle;

  if (stroke) {
    const edge1 = { start: a, end: b, width: stroke.width };
    const edge2 = { start: b, end: c, width: stroke.width };
    const edge3 = { start: c, end: a, width: stroke.width };

    return (
      lineHitbox(edge1)(point) ||
      lineHitbox(edge2)(point) ||
      lineHitbox(edge3)(point)
    );
  }

  const { x, y } = point;

  const area =
    0.5 * (-b.y * c.x + a.y * (-b.x + c.x) + a.x * (b.y - c.y) + b.x * c.y);
  const s =
    (1 / (2 * area)) *
    (a.y * c.x - a.x * c.y + (c.y - a.y) * x + (a.x - c.x) * y);
  const t =
    (1 / (2 * area)) *
    (a.x * b.y - a.y * b.x + (a.y - b.y) * x + (b.x - a.x) * y);

  const isInsideTriangle = s > 0 && t > 0 && 1 - s - t > 0;

  return isInsideTriangle;
};

export const getTriangleBoundingBox = (triangle: TriangleSchema) => () => {
  const { pointA: a, pointB: b, pointC: c } = triangle;

  const minX = Math.min(a.x, b.x, c.x);
  const minY = Math.min(a.y, b.y, c.y);
  const maxX = Math.max(a.x, b.x, c.x);
  const maxY = Math.max(a.y, b.y, c.y);

  return normalizeBoundingBox({
    at: { x: minX, y: minY },
    width: maxX - minX,
    height: maxY - minY,
  });
};

export const triangleEfficientHitbox = (triangle: TriangleSchema) => {
  const triangleBoundingBox = getTriangleBoundingBox(triangle)();

  const isInRectEfficientHitbox = rectEfficientHitbox(triangleBoundingBox);

  return (boxToCheck: BoundingBox) => isInRectEfficientHitbox(boxToCheck);
};
