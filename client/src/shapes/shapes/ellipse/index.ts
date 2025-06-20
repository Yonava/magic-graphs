import type { Coordinate } from '@shape/types/utility';
import { drawEllipseWithCtx } from '@shape/shapes/ellipse/draw';
import {
  ellipseHitbox,
  ellipseEfficientHitbox,
  getEllipseBoundingBox,
} from './hitbox';
import type {
  AnchorPoint,
  FillColor,
  Stroke,
  TextArea,
} from '@shape/types/schema';
import type { ShapeFactory } from '@shape/types';
import { BACKGROUND_COLOR_DEFAULTS } from '@shape/defaults/schema';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';

export type EllipseSchema = {
  radiusX: number;
  radiusY: number;
} &
  AnchorPoint &
  FillColor &
  Stroke &
  TextArea;

export const ELLIPSE_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
} as const satisfies Partial<EllipseSchema>;

export const ellipse: ShapeFactory<EllipseSchema> = (options) => {
  if (options.radiusX < 0 || options.radiusY < 0) {
    throw new Error('radius must be positive');
  }

  const shapeTextProps = getShapeTextProps(options.at, options.textArea)

  const drawShape = drawEllipseWithCtx(options);
  const shapeHitbox = ellipseHitbox(options);

  const efficientHitbox = ellipseEfficientHitbox(options);
  const hitbox = (point: Coordinate) =>
    shapeTextProps?.textHitbox(point) || shapeHitbox(point);

  const getBoundingBox = getEllipseBoundingBox(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    shapeTextProps?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'ellipse',

    draw,

    drawShape,

    hitbox,
    shapeHitbox,

    efficientHitbox,
    getBoundingBox,

    ...shapeTextProps
  });
};
