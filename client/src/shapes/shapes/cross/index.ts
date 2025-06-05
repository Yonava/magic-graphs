import type { Coordinate } from '@shape/types/utility';
import {
  crossHitbox,
  crossEfficientHitbox,
  getCrossBoundingBox,
} from './hitbox';
import { drawCrossWithCtx } from './draw';
import { LINE_SCHEMA_DEFAULTS } from '@shape/shapes/line';
import type { ShapeFactory } from '@shape/types';

export type CrossSchema = {
  at: Coordinate;
  size: number;

  rotation?: number;
  color?: string;
  lineWidth?: number;
  borderRadius?: number;
};

export const CROSS_SCHEMA_DEFAULTS = {
  rotation: 0,
  color: 'black',
  lineWidth: LINE_SCHEMA_DEFAULTS.lineWidth,
  borderRadius: 0,
} as const;

export const cross: ShapeFactory<CrossSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const drawShape = drawCrossWithCtx(options);
  const shapeHitbox = crossHitbox(options);
  const efficientHitbox = crossEfficientHitbox(options);

  const getBoundingBox = getCrossBoundingBox(options);

  return {
    name: 'cross',

    draw: drawShape,
    drawShape,

    hitbox: shapeHitbox,
    shapeHitbox,

    efficientHitbox,
    getBoundingBox,
  };
};
