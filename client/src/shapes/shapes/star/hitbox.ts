import type { Coordinate, BoundingBox } from '@shape/types/utility';
import type { StarSchema } from './types';
import { areBoundingBoxesOverlapping, normalizeBoundingBox, rotatePoint } from '@shape/helpers';
import type { StarSchemaWithDefaults } from './defaults';

const getStarPoints = (star: StarSchema): Coordinate[] => {
  const { at, innerRadius, outerRadius, points = 5, rotation = 0 } = star;
  const vertices: Coordinate[] = [];

  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / points;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const rotated = rotatePoint({ x, y }, { x: 0, y: 0 }, rotation);
    vertices.push({
      x: rotated.x + at.x,
      y: rotated.y + at.y,
    });
  }

  return vertices;
};

const isPointInPolygon = (
  point: Coordinate,
  vertices: Coordinate[],
) => {
  let inside = false;

  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x;
    const yi = vertices[i].y;
    const xj = vertices[j].x;
    const yj = vertices[j].y;

    const intersect =
      yi > point.y !== yj > point.y &&
      (yj - yi !== 0
        ? point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi
        : point.x < xi);

    if (intersect) inside = !inside;
  }

  return inside;
};

export const starHitbox = (schema: StarSchemaWithDefaults) => (point: Coordinate) => {
  const vertices = getStarPoints(schema);
  return isPointInPolygon(point, vertices);
};

export const getStarBoundingBox = (schema: StarSchemaWithDefaults) => () => {
  const { at, outerRadius } = schema;
  const size = outerRadius * 2;

  return normalizeBoundingBox({
    at: { x: at.x - outerRadius, y: at.y - outerRadius },
    width: size,
    height: size,
  });
};

export const starEfficientHitbox = (
  schema: StarSchemaWithDefaults
) => (boxToCheck: BoundingBox) => areBoundingBoxesOverlapping(
  getStarBoundingBox(schema)(),
  boxToCheck,
)
