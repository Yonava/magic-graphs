import { rectHitbox, rectEfficientHitbox, getRectBoundingBox } from './hitbox';
import { drawRectWithCtx } from './draw';
import type { Coordinate } from '@shape/types/utility';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { validateBorderRadius } from '../../optionsValidator';
import { getShapeTextProps } from '@shape/text/text';
import { getCenterPoint } from '@shape/helpers';
import type { RectSchema } from './types';
import { resolveRectDefaults } from './defaults';

export const rect: ShapeFactory<RectSchema> = (options) => {
  validateBorderRadius(options);

  const schema = resolveRectDefaults(options)
  const text = getShapeTextProps(getCenterPoint(schema), schema.textArea)

  const shapeHitbox = rectHitbox(schema);
  const efficientHitbox = rectEfficientHitbox(schema);
  const hitbox = (point: Coordinate) => text?.textHitbox(point) || shapeHitbox(point);

  const getBoundingBox = getRectBoundingBox(schema);

  const drawShape = drawRectWithCtx(schema);
  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'rect',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,

    getBoundingBox,

    ...text,
  });
};
