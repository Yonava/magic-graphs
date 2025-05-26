import type { Coordinate, ShapeFactory } from '@shape/types';
import {
  crossHitbox,
  crossEfficientHitbox,
  getCrossBoundingBox,
} from './hitbox';
import { drawCrossWithCtx } from './draw';
import { LINE_SCHEMA_DEFAULTS } from '@shape/line';
import { generateId } from '@utils/id';

export type CrossSchema = {
  id?: string;
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
  lineWidth: LINE_SCHEMA_DEFAULTS.width,
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
    id: options.id ?? generateId(),
    name: 'cross',

    draw: drawShape,
    drawShape,

    hitbox: shapeHitbox,
    shapeHitbox,

    efficientHitbox,
    getBoundingBox,
  };
};
