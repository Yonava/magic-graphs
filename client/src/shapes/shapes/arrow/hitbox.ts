import type { Coordinate, BoundingBox } from '@shape/types/utility';
import { getLineBoundingBox } from '@shape/shapes/line/hitbox';
import {
  calculateArrowHeadCorners,
  normalizeBoundingBox,
} from '@shape/helpers';
import { ARROW_SCHEMA_DEFAULTS, type ArrowSchemaWithDefaults } from './defaults';
import { line } from '../line';
import { triangle } from '../triangle';

export const arrowHitbox = (schema: ArrowSchemaWithDefaults) => {
  const {
    start,
    end,
    lineWidth: width,
  } = schema

  const headSchema = calculateArrowHeadCorners({
    start,
    end,
    lineWidth: width,
  });

  const shaft = line(schema);
  const head = triangle(headSchema)

  return (point: Coordinate) => shaft.hitbox(point) || head.hitbox(point);
};

export const getArrowBoundingBox = (arrow: ArrowSchemaWithDefaults) => () => {
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
    lineWidth: arrowHeadWidth,
  } = {
    ...ARROW_SCHEMA_DEFAULTS,
    ...arrow,
  };

  const headSchema = calculateArrowHeadCorners({
    start,
    end,
    lineWidth: arrowHeadWidth,
  });

  const minX = Math.min(
    lineTopLeft.x,
    lineBottomRight.x,
    headSchema.pointA.x,
    headSchema.pointB.x,
    headSchema.pointC.x,
  );

  const maxX = Math.max(
    lineTopLeft.x,
    lineBottomRight.x,
    headSchema.pointA.x,
    headSchema.pointB.x,
    headSchema.pointC.x,
  );

  const minY = Math.min(
    lineTopLeft.y,
    lineBottomRight.y,
    headSchema.pointA.y,
    headSchema.pointB.y,
    headSchema.pointC.y,
  );

  const maxY = Math.max(
    lineTopLeft.y,
    lineBottomRight.y,
    headSchema.pointA.y,
    headSchema.pointB.y,
    headSchema.pointC.y,
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

export const arrowEfficientHitbox = (schema: ArrowSchemaWithDefaults) => {
  const {
    start,
    end,
    lineWidth: width,
  } = schema;

  const headSchema = calculateArrowHeadCorners({
    start,
    end,
    lineWidth: width,
  });

  const shaft = line(schema);
  const head = triangle(headSchema)

  return (bb: BoundingBox) => shaft.efficientHitbox(bb) || head.efficientHitbox(bb);
};
