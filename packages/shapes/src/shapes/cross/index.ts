import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types/index.ts';
import type { Coordinate } from '../../types/utility.ts';
import { resolveCrossDefaults } from './defaults.ts';
import { drawCrossWithCtx } from './draw.ts';
import {
  crossEfficientHitbox,
  crossHitbox,
  getCrossBoundingBox,
} from './hitbox.ts';
import type { CrossSchema } from './types.ts';

export const cross: ShapeFactory<CrossSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const schema = resolveCrossDefaults(options);
  const drawShape = drawCrossWithCtx(schema);
  const text = getShapeTextProps(schema.at, schema.textArea, drawShape);
  const { drawOverride, ...textProps } = text ?? {};
  const draw = drawOverride ?? ((ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  });

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

    ...textProps,
  });
};
