import { getCenterPoint } from '../../helpers.ts';
import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types.ts';
import type { Coordinate } from '../../types/utility.ts';
import { resolveScribbleDefaults } from './defaults';
import { drawScribbleWithCtx } from './draw';
import {
  getScribbleBoundingBox,
  scribbleEfficientHitbox,
  scribbleHitbox,
} from './hitbox';
import type { ScribbleSchema } from './types.ts';

export const ERASER_BRUSH_WEIGHT = 50;

export const scribble: ShapeFactory<ScribbleSchema> = (options) => {
  if (options.points.length < 1) {
    throw new Error('not enough points to draw scribble');
  }
  if (options.brushWeight && options.brushWeight < 1) {
    throw new Error('brushWeight must be at least "1"');
  }

  const schema = resolveScribbleDefaults(options);

  const getBoundingBox = getScribbleBoundingBox(schema);

  const anchorPt = getCenterPoint(getBoundingBox());
  const text = getShapeTextProps(anchorPt, schema.textArea);

  const shapeHitbox = scribbleHitbox(schema);
  const efficientHitbox = scribbleEfficientHitbox(schema);
  const hitbox = (pt: Coordinate) => text?.textHitbox(pt) || shapeHitbox(pt);

  const drawShape = drawScribbleWithCtx(schema);
  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
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
