import {
  drawTextAreaOnTriangle,
  drawTextAreaMatteOnTriangle,
  drawTextOnTriangle,
  triangleTextHitbox,
} from './text';
import {
  triangleHitbox,
  triangleEfficientHitbox,
  getTriangleBoundingBox,
} from './hitbox';
import { drawTriangleWithCtx } from './draw';
import type { Coordinate } from '@shape/types/utility';
import type {
  FillColor,
  FillGradient,
  Stroke,
  TextArea,
} from '@shape/types/schema';
import type { ShapeFactory } from '@shape/types';
import { BACKGROUND_COLOR_DEFAULTS } from '@shape/defaults/schema';
import { shapeFactoryWrapper } from '@shape/factories';

export type TriangleSchema = FillColor &
  Stroke &
  TextArea &
  FillGradient & {
    pointA: Coordinate;
    pointB: Coordinate;
    pointC: Coordinate;
  };

export const TRIANGLE_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
} as const satisfies Partial<TriangleSchema>;

export const triangle: ShapeFactory<TriangleSchema> = (options) => {
  const drawShape = drawTriangleWithCtx(options);
  const shapeHitbox = triangleHitbox(options);
  const textHitbox = triangleTextHitbox(options);
  const efficientHitbox = triangleEfficientHitbox(options);
  const hitbox = shapeHitbox;

  const getBoundingBox = getTriangleBoundingBox(options);

  const drawTextArea = drawTextAreaOnTriangle(options);

  const drawTextAreaMatte = drawTextAreaMatteOnTriangle(options);
  const drawText = drawTextOnTriangle(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    drawTextArea?.(ctx);
  };

  return shapeFactoryWrapper({
    name: 'triangle',

    draw,
    drawShape,
    drawTextArea,
    drawTextAreaMatte,
    drawText,

    hitbox,
    shapeHitbox,
    textHitbox,
    efficientHitbox,
    getBoundingBox,
  });
};
