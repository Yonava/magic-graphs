import type { Coordinate, BoundingBox } from '@shape/types';
import type { StarSchema } from '.';
import { rotatePoint } from '@shape/helpers';

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

export const starHitbox =
  (star: StarSchema) =>
    (point: Coordinate): boolean => {
      const vertices = getStarPoints(star);
      return isPointInPolygon(point, vertices);
    };

export const getStarBoundingBox = (star: StarSchema) => (): BoundingBox => {
  const { at, outerRadius } = star;
  const size = outerRadius * 2;
  return {
    at: { x: at.x - outerRadius, y: at.y - outerRadius },
    width: size,
    height: size,
  };
};

export const starEfficientHitbox =
  (star: StarSchema) =>
    (boxToCheck: BoundingBox): boolean => {
      const bb = getStarBoundingBox(star)();
      return (
        boxToCheck.at.x < bb.at.x + bb.width &&
        boxToCheck.at.x + boxToCheck.width > bb.at.x &&
        boxToCheck.at.y < bb.at.y + bb.height &&
        boxToCheck.at.y + boxToCheck.height > bb.at.y
      );
    };
