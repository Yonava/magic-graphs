import type { Coordinate, BoundingBox } from '@shape/types';
import {
  lineHitbox,
  lineEfficientHitbox,
  getLineBoundingBox,
} from '@shape/line/hitbox';
import { type Arrow } from '.';
import { ARROW_DEFAULTS } from '.';
import {
  triangleEfficientHitbox,
  triangleHitbox,
} from '@shape/triangle/hitbox';
import { calculateArrowHeadCorners } from '@shape/helpers';

export const arrowHitbox = (arrow: Arrow) => {
  const { start, end, width, arrowHeadSize, arrowHeadShape } = {
    ...ARROW_DEFAULTS,
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

export const getArrowBoundingBox = (arrow: Arrow) => () => {
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
    ...ARROW_DEFAULTS,
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
    arrowHeadTriangle.pointA.x,
    arrowHeadTriangle.pointB.x,
    arrowHeadTriangle.pointC.x,
  );
  const maxX = Math.max(
    lineTopLeft.x,
    arrowHeadTriangle.pointA.x,
    arrowHeadTriangle.pointB.x,
    arrowHeadTriangle.pointC.x,
  );
  const minY = Math.min(
    lineBottomRight.y,
    arrowHeadTriangle.pointA.y,
    arrowHeadTriangle.pointB.y,
    arrowHeadTriangle.pointC.y,
  );
  const maxY = Math.max(
    lineBottomRight.y,
    arrowHeadTriangle.pointA.y,
    arrowHeadTriangle.pointB.y,
    arrowHeadTriangle.pointC.y,
  );

  return {
    at: {
      x: minX,
      y: minY,
    },
    width: maxX - minX,
    height: maxY - minY,
  };
};

export const arrowEfficientHitbox = (arrow: Arrow) => {
  const isInLineEfficientHitbox = lineEfficientHitbox(arrow);
  const { start, end, width, arrowHeadSize } = {
    ...ARROW_DEFAULTS,
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
