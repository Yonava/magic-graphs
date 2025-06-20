import { drawScribbleWithCtx } from './draw';
import {
  scribbleHitbox,
  scribbleEfficientHitbox,
  getScribbleBoundingBox,
} from './hitbox';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import type { ScribbleSchema } from './types';

export const ERASER_BRUSH_WEIGHT = 50;

export const scribble: ShapeFactory<ScribbleSchema> = (options) => {
  if (options.points.length < 1) {
    throw new Error('not enough points to draw scribble');
  }
  if (options.brushWeight && options.brushWeight < 1) {
    throw new Error('brushWeight must be at least "1"');
  }

  const shapeHitbox = scribbleHitbox(options);
  const efficientHitbox = scribbleEfficientHitbox(options);
  const hitbox = shapeHitbox;

  const getBoundingBox = getScribbleBoundingBox(options);

  const drawShape = drawScribbleWithCtx(options);
  const draw = drawShape;

  return shapeFactoryWrapper({
    name: 'scribble',

    drawShape,
    draw,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,
  });
};
