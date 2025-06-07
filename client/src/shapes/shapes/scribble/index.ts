import type { Coordinate } from '@shape/types/utility';
import { drawScribbleWithCtx } from './draw';
import {
  scribbleHitbox,
  scribbleEfficientHitbox,
  getScribbleBoundingBox,
} from './hitbox';
import type { ShapeFactory } from '@shape/types';
import { BACKGROUND_COLOR_DEFAULTS } from '@shape/defaults/schema';
import type { FillColor } from '@shape/types/schema';
import { withCenterPoint } from '@shape/factories';

export type ScribbleSchema = FillColor & {
  type: 'draw' | 'erase';
  points: Coordinate[];
  brushWeight?: number;
};

export const SCRIBBLE_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
  brushWeight: 3,
} as const satisfies Partial<ScribbleSchema>;

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

  return withCenterPoint({
    name: 'scribble',

    drawShape,
    draw,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,
  });
};
