import { drawScribbleWithCtx } from './draw';
import {
  scribbleHitbox,
  scribbleEfficientHitbox,
  getScribbleBoundingBox,
} from './hitbox';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import type { ScribbleSchema } from './types';
import { resolveScribbleDefaults } from './defaults';
import { getShapeTextProps } from '@shape/text/text';
import { getCenterPoint } from '@shape/helpers';
import type { Coordinate } from '@shape/types/utility';

export const ERASER_BRUSH_WEIGHT = 50;

export const scribble: ShapeFactory<ScribbleSchema> = (options) => {
  if (options.points.length < 1) {
    throw new Error('not enough points to draw scribble');
  }
  if (options.brushWeight && options.brushWeight < 1) {
    throw new Error('brushWeight must be at least "1"');
  }

  const schema = resolveScribbleDefaults(options)

  const getBoundingBox = getScribbleBoundingBox(schema);

  const anchorPt = getCenterPoint(getBoundingBox())
  const text = getShapeTextProps(anchorPt, schema.textArea)

  const shapeHitbox = scribbleHitbox(schema);
  const efficientHitbox = scribbleEfficientHitbox(schema);
  const hitbox = (pt: Coordinate) => text?.textHitbox(pt) || shapeHitbox(pt);

  const drawShape = drawScribbleWithCtx(schema);
  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx)
    text?.drawTextArea(ctx)
  };

  return shapeFactoryWrapper({
    name: 'scribble',

    drawShape,
    draw,

    hitbox,
    shapeHitbox,
    efficientHitbox,

    getBoundingBox,

    ...text,
  });
};
