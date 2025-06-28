import type { Coordinate } from '@shape/types/utility';
import { drawEllipseWithCtx } from '@shape/shapes/ellipse/draw';
import {
  ellipseHitbox,
  ellipseEfficientHitbox,
  getEllipseBoundingBox,
} from './hitbox';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';
import type { EllipseSchema } from './types';
import { resolveEllipseDefaults } from './defaults';

export const ellipse: ShapeFactory<EllipseSchema> = (options) => {
  if (options.radiusX < 0 || options.radiusY < 0) {
    throw new Error('radius must be positive');
  }

  const schema = resolveEllipseDefaults(options)
  const text = getShapeTextProps(schema.at, schema.textArea)

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

    ...text
  });
};
