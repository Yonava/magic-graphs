import type { Coordinate, BoundingBox } from '@shape/types/utility';
import type { StarSchema } from './types';
import { normalizeBoundingBox, rotatePoint } from '@shape/helpers';
import { rectEfficientHitbox } from '@shape/shapes/rect/hitbox';

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
): boolean => {
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

export const starHitbox = (star: StarSchema) => (point: Coordinate) => {
  const vertices = getStarPoints(star);
  return isPointInPolygon(point, vertices);
};

export const getStarBoundingBox = (star: StarSchema) => () => {
  const { at, outerRadius } = star;
  const size = outerRadius * 2;

  return normalizeBoundingBox({
    at: { x: at.x - outerRadius, y: at.y - outerRadius },
    width: size,
    height: size,
  });
};

export const starEfficientHitbox = (star: StarSchema) => {
  const starBoundingBox = getStarBoundingBox(star)();

  const isInRectEfficientHitbox = rectEfficientHitbox(starBoundingBox);

  return (boxToCheck: BoundingBox) => isInRectEfficientHitbox(boxToCheck);
};
