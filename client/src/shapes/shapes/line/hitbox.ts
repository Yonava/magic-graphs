import type { Coordinate, BoundingBox } from '@shape/types';
import { LINE_SCHEMA_DEFAULTS } from '.';
import type { LineSchema } from '.';
import { rectEfficientHitbox } from '@shape/shapes/rect/hitbox';
import { normalizeBoundingBox } from '@shape/helpers';

/**
 * @param point - the point to check if it is in the line
 * @returns a function that checks if the point is in the line
 */
export const lineHitbox = (line: LineSchema) => (point: Coordinate) => {
  const { start, end, width } = {
    ...LINE_SCHEMA_DEFAULTS,
    ...line,
  };

  const { x: x1, y: y1 } = start;
  const { x: x2, y: y2 } = end;
  const { x, y } = point;

  const lineLengthSquared = (x2 - x1) ** 2 + (y2 - y1) ** 2;

  if (lineLengthSquared === 0) {
    const distanceSquared = (x - x1) ** 2 + (y - y1) ** 2;
    return distanceSquared <= (width / 2) ** 2;
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

  return distanceSquared <= (width / 2) ** 2;
};

export const getLineBoundingBox = (line: LineSchema) => () => {
  const { start, end, width } = {
    ...LINE_SCHEMA_DEFAULTS,
    ...line,
  };

  const minX = Math.min(start.x, end.x) - width / 2;
  const minY = Math.min(start.y, end.y) - width / 2;
  const maxX = Math.max(start.x, end.x) + width / 2;
  const maxY = Math.max(start.y, end.y) + width / 2;

  return normalizeBoundingBox({
    at: {
      x: minX,
      y: minY,
    },
    width: maxX - minX,
    height: maxY - minY,
  });
};

export const lineEfficientHitbox = (line: LineSchema) => {
  const { start, end, width } = {
    ...LINE_SCHEMA_DEFAULTS,
    ...line,
  };

  const lineLength = Math.hypot(end.x - start.x, end.y - start.y);

  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const angleFactor = Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle));
  const segmentLength = Math.min(50, lineLength * angleFactor); // adjust segment length based on angle
  const numSegments = Math.ceil(lineLength / segmentLength);

  const dx = (end.x - start.x) / lineLength;
  const dy = (end.y - start.y) / lineLength;

  const minX = Math.min(start.x, end.x) - width / 2;
  const minY = Math.min(start.y, end.y) - width / 2;
  const boundingBoxWidth = Math.abs(end.x - start.x) + width;
  const boundingBoxHeight = Math.abs(end.y - start.y) + width;

  const isInBoundingBox = rectEfficientHitbox({
    at: { x: minX, y: minY },
    width: boundingBoxWidth,
    height: boundingBoxHeight,
  });

  return (boxToCheck: BoundingBox) => {
    // initial check to see if close to line using original rectangle method
    if (!isInBoundingBox(boxToCheck)) {
      return false;
    }

    const segmentHitboxes = Array.from({ length: numSegments }, (_, i) => {
      const segmentStartX = start.x + dx * segmentLength * i;
      const segmentStartY = start.y + dy * segmentLength * i;
      const segmentEndX = segmentStartX + dx * segmentLength;
      const segmentEndY = segmentStartY + dy * segmentLength;

      const segMinX = Math.min(segmentStartX, segmentEndX) - width / 2;
      const segMinY = Math.min(segmentStartY, segmentEndY) - width / 2;
      const segWidth = Math.abs(segmentEndX - segmentStartX) + width;
      const segHeight = Math.abs(segmentEndY - segmentStartY) + width;

      return rectEfficientHitbox({
        at: { x: segMinX, y: segMinY },
        width: segWidth,
        height: segHeight,
      });
    });

    return segmentHitboxes.some((hitbox) => hitbox(boxToCheck));
  };
};
