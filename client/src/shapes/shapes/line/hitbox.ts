import { areBoundingBoxesOverlapping, normalizeBoundingBox } from '@shape/helpers';
import type { BoundingBox, Coordinate } from '@shape/types/utility';
import type { LineSchemaWithDefaults } from './defaults';

/**
 * @param point - the point to check if it is in the line
 * @returns a function that checks if the point is in the line
 */
export const lineHitbox = (schema: LineSchemaWithDefaults) => (point: Coordinate) => {
  const { start, end, lineWidth } = schema;

  const { x: x1, y: y1 } = start;
  const { x: x2, y: y2 } = end;
  const { x, y } = point;

  const lineLengthSquared = (x2 - x1) ** 2 + (y2 - y1) ** 2;

  if (lineLengthSquared === 0) {
    const distanceSquared = (x - x1) ** 2 + (y - y1) ** 2;
    return distanceSquared <= (lineWidth / 2) ** 2;
  }

  const projectionDistance =
    ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / lineLengthSquared;

  const clampedProjectionDistance = Math.max(
    0,
    Math.min(1, projectionDistance),
  );

  const closestX = x1 + clampedProjectionDistance * (x2 - x1);
  const closestY = y1 + clampedProjectionDistance * (y2 - y1);

  const distanceSquared = (x - closestX) ** 2 + (y - closestY) ** 2;

  return distanceSquared <= (lineWidth / 2) ** 2;
};

export const getLineBoundingBox = (schema: LineSchemaWithDefaults) => () => {
  const { start, end, lineWidth } = schema;

  const minX = Math.min(start.x, end.x) - lineWidth / 2;
  const minY = Math.min(start.y, end.y) - lineWidth / 2;
  const maxX = Math.max(start.x, end.x) + lineWidth / 2;
  const maxY = Math.max(start.y, end.y) + lineWidth / 2;

  return normalizeBoundingBox({
    at: {
      x: minX,
      y: minY,
    },
    width: maxX - minX,
    height: maxY - minY,
  });
};

export const lineEfficientHitbox = (schema: LineSchemaWithDefaults) => {
  const { start, end, lineWidth } = schema;

  const lineLength = Math.hypot(end.x - start.x, end.y - start.y);

  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const angleFactor = Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle));
  const segmentLength = Math.min(50, lineLength * angleFactor); // adjust segment length based on angle
  const numSegments = Math.ceil(lineLength / segmentLength);

  const dx = (end.x - start.x) / lineLength;
  const dy = (end.y - start.y) / lineLength;

  return (boxToCheck: BoundingBox) => {
    // initial check to see if close to line
    const inBoundingBox = areBoundingBoxesOverlapping(
      getLineBoundingBox(schema)(),
      boxToCheck,
    )

    if (!inBoundingBox) return false;

    const segmentBoundBoxes = Array.from({ length: numSegments }, (_, i) => {
      const segmentStartX = start.x + dx * segmentLength * i;
      const segmentStartY = start.y + dy * segmentLength * i;
      const segmentEndX = segmentStartX + dx * segmentLength;
      const segmentEndY = segmentStartY + dy * segmentLength;

      const segMinX = Math.min(segmentStartX, segmentEndX) - lineWidth / 2;
      const segMinY = Math.min(segmentStartY, segmentEndY) - lineWidth / 2;
      const segWidth = Math.abs(segmentEndX - segmentStartX) + lineWidth;
      const segHeight = Math.abs(segmentEndY - segmentStartY) + lineWidth;

      return normalizeBoundingBox({
        at: { x: segMinX, y: segMinY },
        width: segWidth,
        height: segHeight,
      });
    });

    return segmentBoundBoxes.some((bb) => areBoundingBoxesOverlapping(
      bb,
      boxToCheck,
    ));
  };
};
