import type { Coordinate, BoundingBox } from '@shape/types/utility';
import { areBoundingBoxesOverlapping, isPointInLine, normalizeBoundingBox } from '@shape/helpers';
import type { TriangleSchemaWithDefaults } from './defaults';

/**
 * uses barycentric coordinate system for triangles. dont ask me, im not that smart.
 * https://en.wikipedia.org/wiki/Barycentric_coordinate_system
 *
  @param {Coordinate} point - the point to check if it is in the triangle
  @returns a function that checks if the point is in the triangle
*/
export const triangleHitbox = (
  schema: TriangleSchemaWithDefaults
) => (point: Coordinate) => {
  const { pointA: a, pointB: b, pointC: c, stroke } = schema;

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

  if (!stroke) return isInsideTriangle;

  const edge1 = { start: a, end: b, ...stroke };
  const edge2 = { start: b, end: c, ...stroke };
  const edge3 = { start: c, end: a, ...stroke };

  const isOnStroke = isPointInLine(edge1, point) ||
    isPointInLine(edge2, point) ||
    isPointInLine(edge3, point);

  return isInsideTriangle || isOnStroke;
};

export const getTriangleBoundingBox = (triangle: TriangleSchemaWithDefaults) => () => {
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

export const triangleEfficientHitbox = (schema: TriangleSchemaWithDefaults) => (
  boxToCheck: BoundingBox
) => areBoundingBoxesOverlapping(
  getTriangleBoundingBox(schema)(),
  boxToCheck,
)
