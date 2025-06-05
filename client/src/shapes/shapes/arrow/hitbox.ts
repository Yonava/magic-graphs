import type { Coordinate, BoundingBox } from '@shape/types/utility'
import {
  lineHitbox,
  lineEfficientHitbox,
  getLineBoundingBox,
} from '@shape/shapes/line/hitbox';
import { type ArrowSchema } from '.';
import { ARROW_SCHEMA_DEFAULTS } from '.';
import {
  triangleEfficientHitbox,
  triangleHitbox,
} from '@shape/shapes/triangle/hitbox';
import {
  calculateArrowHeadCorners,
  normalizeBoundingBox,
} from '@shape/helpers';

export const arrowHitbox = (arrow: ArrowSchema) => {
  const { start, end, width, arrowHeadSize, arrowHeadShape } = {
    ...ARROW_SCHEMA_DEFAULTS,
    ...arrow,
  };

  const isInLine = lineHitbox(arrow);

  const { arrowHeadHeight, perpLineLength } = arrowHeadSize(width);

  const arrowHeadTriangle = calculateArrowHeadCorners({
    start,
    end,
    width,
    arrowHeadSize,
  });

  const isInArrowHead = arrowHeadShape
    ? arrowHeadShape(end, arrowHeadHeight, perpLineLength).hitbox
    : triangleHitbox(arrowHeadTriangle);

  return (point: Coordinate) => isInLine(point) || isInArrowHead(point);
};

export const getArrowBoundingBox = (arrow: ArrowSchema) => () => {
  const { at, width, height } = getLineBoundingBox(arrow)();

  const lineTopLeft = {
    x: at.x,
    y: at.y,
  };
  const lineBottomRight = {
    x: at.x + width,
    y: at.y + height,
  };

  const {
    start,
    end,
    width: arrowHeadWidth,
    arrowHeadSize,
  } = {
    ...ARROW_SCHEMA_DEFAULTS,
    ...arrow,
  };

  const arrowHeadTriangle = calculateArrowHeadCorners({
    start,
    end,
    width: arrowHeadWidth,
    arrowHeadSize,
  });

  const minX = Math.min(
    lineTopLeft.x,
    lineBottomRight.x,
    arrowHeadTriangle.pointA.x,
    arrowHeadTriangle.pointB.x,
    arrowHeadTriangle.pointC.x,
  );

  const maxX = Math.max(
    lineTopLeft.x,
    lineBottomRight.x,
    arrowHeadTriangle.pointA.x,
    arrowHeadTriangle.pointB.x,
    arrowHeadTriangle.pointC.x,
  );

  const minY = Math.min(
    lineTopLeft.y,
    lineBottomRight.y,
    arrowHeadTriangle.pointA.y,
    arrowHeadTriangle.pointB.y,
    arrowHeadTriangle.pointC.y,
  );

  const maxY = Math.max(
    lineTopLeft.y,
    lineBottomRight.y,
    arrowHeadTriangle.pointA.y,
    arrowHeadTriangle.pointB.y,
    arrowHeadTriangle.pointC.y,
  );

  return normalizeBoundingBox({
    at: {
      x: minX,
      y: minY,
    },
    width: maxX - minX,
    height: maxY - minY,
  });
};

export const arrowEfficientHitbox = (arrow: ArrowSchema) => {
  const isInLineEfficientHitbox = lineEfficientHitbox(arrow);

  const { start, end, width, arrowHeadSize } = {
    ...ARROW_SCHEMA_DEFAULTS,
    ...arrow,
  };

  const arrowHeadTriangle = calculateArrowHeadCorners({
    start,
    end,
    width,
    arrowHeadSize,
  });

  const isInArrowHeadEfficientHitbox =
    triangleEfficientHitbox(arrowHeadTriangle);

  return (boxToCheck: BoundingBox) =>
    isInLineEfficientHitbox(boxToCheck) ||
    isInArrowHeadEfficientHitbox(boxToCheck);
};
