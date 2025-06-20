import { getTextAreaAnchorPoint } from './text';
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
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';

export type TriangleSchema = {
  pointA: Coordinate;
  pointB: Coordinate;
  pointC: Coordinate;
} &
  FillColor &
  Stroke &
  TextArea &
  FillGradient;

export const TRIANGLE_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
} as const satisfies Partial<TriangleSchema>;

export const triangle: ShapeFactory<TriangleSchema> = (options) => {
  const anchorPt = getTextAreaAnchorPoint(options)
  const shapeTextProps = getShapeTextProps(anchorPt, options.textArea)

  const drawShape = drawTriangleWithCtx(options);
  const shapeHitbox = triangleHitbox(options);
  const efficientHitbox = triangleEfficientHitbox(options);
  const hitbox = shapeHitbox;

  const getBoundingBox = getTriangleBoundingBox(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    shapeTextProps?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'triangle',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...shapeTextProps,
  });
};
