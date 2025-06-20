import {
  crossHitbox,
  crossEfficientHitbox,
  getCrossBoundingBox,
} from './hitbox';
import { drawCrossWithCtx } from './draw';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import type { CrossSchema } from './types';

export const cross: ShapeFactory<CrossSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const drawShape = drawCrossWithCtx(options);
  const shapeHitbox = crossHitbox(options);
  const efficientHitbox = crossEfficientHitbox(options);

  const getBoundingBox = getCrossBoundingBox(options);

  return shapeFactoryWrapper({
    name: 'cross',

    draw: drawShape,
    drawShape,

    hitbox: shapeHitbox,
    shapeHitbox,

    efficientHitbox,
    getBoundingBox,
  });
};
