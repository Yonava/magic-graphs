import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { drawEllipseWithCtx } from '../../shapes/ellipse/draw.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types/index.ts';
import type { Coordinate } from '../../types/utility.ts';
import { resolveEllipseDefaults } from './defaults.ts';
import {
  ellipseEfficientHitbox,
  ellipseHitbox,
  getEllipseBoundingBox,
} from './hitbox.ts';
import type { EllipseSchema } from './types.ts';

export const ellipse: ShapeFactory<EllipseSchema> = (options) => {
  if (options.radiusX < 0 || options.radiusY < 0) {
    throw new Error('radius must be positive');
  }

  const schema = resolveEllipseDefaults(options);
  const text = getShapeTextProps(schema.at, schema.textArea);

  const drawShape = drawEllipseWithCtx(schema);
  const shapeHitbox = ellipseHitbox(schema);

  const efficientHitbox = ellipseEfficientHitbox(schema);
  const hitbox = (point: Coordinate) =>
    text?.textHitbox(point) || shapeHitbox(point);

  const getBoundingBox = getEllipseBoundingBox(schema);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'ellipse',

    draw,

    drawShape,

    hitbox,
    shapeHitbox,

    efficientHitbox,
    getBoundingBox,

    ...text,
  });
};
