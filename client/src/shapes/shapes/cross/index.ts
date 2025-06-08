import {
  crossHitbox,
  crossEfficientHitbox,
  getCrossBoundingBox,
} from './hitbox';
import { drawCrossWithCtx } from './draw';
import type { ShapeFactory } from '@shape/types';
import type {
  AnchorPoint,
  BorderRadius,
  FillColor,
  LineWidth,
  Rotation,
} from '@shape/types/schema';
import {
  BACKGROUND_COLOR_DEFAULTS,
  BORDER_RADIUS_DEFAULTS,
  LINE_WIDTH_DEFAULTS,
  ROTATION_DEFAULTS,
} from '@shape/defaults/schema';
import { factoryWrapper } from '@shape/factories';

export type CrossSchema = AnchorPoint &
  Rotation &
  LineWidth &
  BorderRadius &
  FillColor & {
    size: number;
  };

export const CROSS_SCHEMA_DEFAULTS = {
  ...ROTATION_DEFAULTS,
  ...BACKGROUND_COLOR_DEFAULTS,
  ...LINE_WIDTH_DEFAULTS,
  ...BORDER_RADIUS_DEFAULTS,
} as const satisfies Partial<CrossSchema>;

export const cross: ShapeFactory<CrossSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const drawShape = drawCrossWithCtx(options);
  const shapeHitbox = crossHitbox(options);
  const efficientHitbox = crossEfficientHitbox(options);

  const getBoundingBox = getCrossBoundingBox(options);

  return factoryWrapper({
    name: 'cross',

    draw: drawShape,
    drawShape,

    hitbox: shapeHitbox,
    shapeHitbox,

    efficientHitbox,
    getBoundingBox,
  });
};
