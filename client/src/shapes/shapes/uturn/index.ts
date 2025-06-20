import { drawUTurnWithCtx } from './draw';
import {
  uturnHitbox,
  uturnEfficientHitbox,
  getUTurnBoundingBox,
} from './hitbox';
import { getTextAreaAnchorPoint } from './text';
import { getArrowHeadSize } from '@shape/helpers';
import type { Coordinate } from '@shape/types/utility';
import type { Shape, ShapeFactory } from '@shape/types';
import {
  BACKGROUND_COLOR_DEFAULTS,
  LINE_WIDTH_DEFAULTS,
  ROTATION_DEFAULTS,
} from '@shape/defaults/schema';
import type {
  AnchorPoint,
  FillColor,
  FillGradient,
  LineWidth,
  Rotation,
  TextArea,
} from '@shape/types/schema';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';

export type UTurnSchema = {
  spacing: number;
  upDistance: number;
  downDistance: number;
  arrowHeadSize?: (width: number) => {
    arrowHeadHeight: number;
    perpLineLength: number;
  };
  arrowHeadShape?: (at: Coordinate, height: number, width: number) => Shape;
} &
  AnchorPoint &
  Rotation &
  LineWidth &
  FillColor &
  TextArea &
  FillGradient;

export const UTURN_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
  ...ROTATION_DEFAULTS,
  ...LINE_WIDTH_DEFAULTS,
  ...ROTATION_DEFAULTS,
  arrowHeadSize: getArrowHeadSize,
} as const satisfies Partial<UTurnSchema>;

export const uturn: ShapeFactory<UTurnSchema> = (options) => {
  if (options.downDistance < 0) {
    throw new Error('downDistance must be positive');
  }

  if (options.upDistance < 0) {
    throw new Error('upDistance must be positive');
  }

  const anchorPt = getTextAreaAnchorPoint(options)
  const shapeTextProps = getShapeTextProps(anchorPt, options.textArea)

  const drawShape = drawUTurnWithCtx(options);

  const shapeHitbox = uturnHitbox(options);
  const efficientHitbox = uturnEfficientHitbox(options);

  const hitbox = (point: Coordinate) => {
    return shapeTextProps?.textHitbox(point) || shapeHitbox(point);
  };

  const getBoundingBox = getUTurnBoundingBox(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    shapeTextProps?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'uturn',

    draw,

    drawShape,

    hitbox,
    shapeHitbox,

    efficientHitbox,
    getBoundingBox,

    ...shapeTextProps,
  });
};
