import {
  crossHitbox,
  crossEfficientHitbox,
  getCrossBoundingBox,
} from './hitbox';
import { drawCrossWithCtx } from './draw';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import type { CrossSchema } from './types';
import { resolveCrossDefaults } from './defaults';
import { getShapeTextProps } from '@shape/text/text';
import type { Coordinate } from '@shape/types/utility';

export const cross: ShapeFactory<CrossSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const schema = resolveCrossDefaults(options)
  const text = getShapeTextProps(schema.at, schema.textArea)

  const drawShape = drawCrossWithCtx(schema);
  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  };

  const shapeHitbox = crossHitbox(schema);
  const efficientHitbox = crossEfficientHitbox(schema);
  const hitbox = (point: Coordinate) => text?.textHitbox(point) || shapeHitbox(point);

  const getBoundingBox = getCrossBoundingBox(schema);

  return shapeFactoryWrapper({
    name: 'cross',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,

    efficientHitbox,
    getBoundingBox,

    ...text,
  });
};
