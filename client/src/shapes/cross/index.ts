import type { Coordinate, Shape } from '@shape/types';
import {
  crossHitbox,
  crossEfficientHitbox,
  getCrossBoundingBox,
} from './hitbox';
import { drawCrossWithCtx } from './draw';
import { LINE_SCHEMA_DEFAULTS } from '@shape/line';
import { generateId } from '@utils/id';

export type Cross = {
  id?: string;
  at: Coordinate;
  size: number;
  rotation?: number;
  color?: string;
  lineWidth?: number;
  borderRadius?: number;
};

export const CROSS_DEFAULTS = {
  rotation: 0,
  color: 'black',
  lineWidth: LINE_SCHEMA_DEFAULTS.width,
  borderRadius: 0,
} as const;

export const cross = (options: Cross): Shape => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const drawShape = drawCrossWithCtx(options);
  const shapeHitbox = crossHitbox(options);
  const efficientHitbox = crossEfficientHitbox(options);
  const hitbox = (point: Coordinate) => {
    return shapeHitbox(point); // text not implemented yet
  };

  const getBoundingBox = getCrossBoundingBox(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
  };

  return {
    id: options.id ?? generateId(),
    name: 'cross',

    draw,
    drawShape,

    shapeHitbox,
    hitbox,
    efficientHitbox,
    getBoundingBox,
  };
};
