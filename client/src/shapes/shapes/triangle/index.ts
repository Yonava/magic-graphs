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
import type { Coordinate, GradientStop, TextArea } from '@shape/types/utility';
import type { Stroke } from '@shape/types/schema';
import type { ShapeFactory } from '@shape/types';

export type TriangleSchema = {
  pointA: Coordinate;
  pointB: Coordinate;
  pointC: Coordinate;

  color?: string;
  stroke?: Stroke;
  textArea?: TextArea;
  gradientStops?: readonly GradientStop[];
};

export const TRIANGLE_SCHEMA_DEFAULTS = {
  color: 'black',
} as const;

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

  return {
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
  };
};
