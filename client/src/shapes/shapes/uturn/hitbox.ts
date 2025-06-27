import { areBoundingBoxesOverlapping, normalizeBoundingBox, rotatePoint } from '@shape/helpers';
import type { Coordinate, BoundingBox } from '@shape/types/utility';
import { circle } from '@shape/shapes/circle';
import type { UTurnSchemaWithDefaults } from './defaults';
import { line } from '../line';
import { arrow } from '../arrow';

export const uturnHitbox = (schema: UTurnSchemaWithDefaults) => {
  const {
    spacing,
    at,
    downDistance,
    upDistance,
    lineWidth,
    rotation
  } = schema;

  const longLegFrom = rotatePoint(
    {
      x: at.x,
      y: at.y - spacing,
    },
    at,
    rotation,
  );

  const longLegTo = rotatePoint(
    {
      x: at.x + upDistance,
      y: at.y - spacing,
    },
    at,
    rotation,
  );

  const shortLegFrom = rotatePoint(
    {
      x: at.x + upDistance,
      y: at.y + spacing,
    },
    at,
    rotation,
  );

  const shortLegTo = rotatePoint(
    {
      x: at.x + upDistance - downDistance,
      y: at.y + spacing,
    },
    at,
    rotation,
  );

  const arcAt = rotatePoint(
    {
      x: at.x + upDistance,
      y: at.y,
    },
    at,
    rotation,
  );

  const { hitbox: inLine } = line({
    start: longLegFrom,
    end: longLegTo,
    lineWidth: lineWidth,
  });

  const { hitbox: inArrow } = arrow({
    start: shortLegFrom,
    end: shortLegTo,
    lineWidth: lineWidth,
  });

  const { hitbox: inUTurnCircle } = circle({
    at: arcAt,
    radius: spacing + lineWidth / 2,
  });

  return (point: Coordinate) => {
    return inLine(point) || inArrow(point) || inUTurnCircle(point);
  }
};

export const getUTurnBoundingBox = (schema: UTurnSchemaWithDefaults) => () => {
  const {
    spacing,
    at,
    upDistance,
    rotation,
    lineWidth
  } = schema;

  const end = rotatePoint(
    {
      x: at.x + upDistance,
      y: at.y,
    },
    at,
    rotation,
  );

  const minX = Math.min(at.x, end.x) - lineWidth / 2 - spacing;
  const minY = Math.min(at.y, end.y) - lineWidth / 2 - spacing;
  const maxX = Math.max(at.x, end.x) + lineWidth / 2 + spacing;
  const maxY = Math.max(at.y, end.y) + lineWidth / 2 + spacing;

  return normalizeBoundingBox({
    at: { x: minX, y: minY },
    width: maxX - minX,
    height: maxY - minY,
  });
};

export const uturnEfficientHitbox = (
  schema: UTurnSchemaWithDefaults
) => (boxToCheck: BoundingBox) => areBoundingBoxesOverlapping(
  getUTurnBoundingBox(schema)(),
  boxToCheck,
)