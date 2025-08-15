import { shapeFactoryWrapper } from '../../shapeWrapper';
import { getShapeTextProps } from '../../text/text';
import type { ShapeFactory } from '../../types';
import type { Coordinate } from '../../types/utility';

import { resolveCrossDefaults } from './defaults';
import { drawCrossWithCtx } from './draw';
import {
  crossEfficientHitbox,
  crossHitbox,
  getCrossBoundingBox,
} from './hitbox';
import type { CrossSchema } from './types';

export const cross: ShapeFactory<CrossSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const schema = resolveCrossDefaults(options);
  const text = getShapeTextProps(schema.at, schema.textArea);

  const drawShape = drawCrossWithCtx(schema);
  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  };

  const shapeHitbox = crossHitbox(schema);
  const efficientHitbox = crossEfficientHitbox(schema);
  const hitbox = (point: Coordinate) =>
    text?.textHitbox(point) || shapeHitbox(point);

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
