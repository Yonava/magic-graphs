import { normalizeBoundingBox, rotatePoint } from '@shape/helpers';
import type { Coordinate, BoundingBox } from '@shape/types/utility';
import { lineHitbox } from '@shape/shapes/line/hitbox';
import { rectEfficientHitbox } from '@shape/shapes/rect/hitbox';
import { arrowHitbox } from '@shape/shapes/arrow/hitbox';
import { circle } from '@shape/shapes/circle';
import type { UTurnSchema } from './types';
import { UTURN_SCHEMA_DEFAULTS } from './defaults';

export const uturnHitbox = (uturn: UTurnSchema) => {
  const { spacing, at, downDistance, upDistance, lineWidth, rotation } = {
    ...UTURN_SCHEMA_DEFAULTS,
    ...uturn,
  };

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

  const isInLine = lineHitbox({
    start: longLegFrom,
    end: longLegTo,
    lineWidth: lineWidth,
  });
  const isInArrow = arrowHitbox({
    start: shortLegFrom,
    end: shortLegTo,
    lineWidth: lineWidth,
  });
  const isInUTurn = circle({
    at: arcAt,
    radius: spacing + lineWidth / 2,
  }).hitbox;

  return (point: Coordinate) =>
    isInLine(point) || isInArrow(point) || isInUTurn(point);
};

export const getUTurnBoundingBox = (uturn: UTurnSchema) => () => {
  const { spacing, at, upDistance, rotation, lineWidth } = {
    ...UTURN_SCHEMA_DEFAULTS,
    ...uturn,
  };

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

export const uturnEfficientHitbox = (uturn: UTurnSchema) => {
  const uturnBoundingBox = getUTurnBoundingBox(uturn)();

  const isInRectEfficientHitbox = rectEfficientHitbox(uturnBoundingBox);

  return (boxToCheck: BoundingBox) => isInRectEfficientHitbox(boxToCheck);
};
