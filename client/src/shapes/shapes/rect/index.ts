import { rectHitbox, rectEfficientHitbox, getRectBoundingBox } from './hitbox';
import { drawRectWithCtx } from './draw';
import type {
  AnchorPoint,
  FillColor,
  BorderRadius,
  Rotation,
  Stroke,
  TextArea,
} from '@shape/types/schema';
import type { Coordinate } from '@shape/types/utility';
import type { ShapeFactory } from '@shape/types';
import {
  BACKGROUND_COLOR_DEFAULTS,
  BORDER_RADIUS_DEFAULTS,
  ROTATION_DEFAULTS,
} from '@shape/defaults/schema';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { validateBorderRadius } from '../../optionsValidator';
import { getShapeTextProps } from '@shape/text/text';
import { getTextAreaAnchorPoint } from './text';

export type RectSchema = {
  width: number;
  height: number;
} &
  AnchorPoint &
  FillColor &
  Stroke &
  TextArea &
  BorderRadius &
  Rotation;

export const RECT_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
  ...BORDER_RADIUS_DEFAULTS,
  ...ROTATION_DEFAULTS,
} as const satisfies Partial<RectSchema>;

export const rect: ShapeFactory<RectSchema> = (options) => {
  validateBorderRadius(options);

  const drawShape = drawRectWithCtx(options);

  const shapeHitbox = rectHitbox(options);
  const efficientHitbox = rectEfficientHitbox(options);

  const getBoundingBox = getRectBoundingBox(options);

  const anchorPt = getTextAreaAnchorPoint(options)
  const shapeTextProps = getShapeTextProps(anchorPt, options.textArea)

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    shapeTextProps?.drawTextArea(ctx);
  };

  const hitbox = (point: Coordinate) =>
    shapeTextProps?.textHitbox(point) || shapeHitbox(point);

  return shapeFactoryWrapper({
    name: 'rect',

    draw,

    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...shapeTextProps,
  });
};
