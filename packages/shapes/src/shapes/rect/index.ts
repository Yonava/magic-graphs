import { getCenterPoint } from '../../helpers.ts';
import { validateBorderRadius } from '../../optionsValidator.ts';
import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types.ts';
import type { Coordinate } from '../../types/utility.ts';
import { resolveRectDefaults } from './defaults';
import { drawRectWithCtx } from './draw';
import { getRectBoundingBox, rectEfficientHitbox, rectHitbox } from './hitbox';
import type { RectSchema } from './types.ts';

export const rect: ShapeFactory<RectSchema> = (options) => {
  validateBorderRadius(options);

  const schema = resolveRectDefaults(options);
  const text = getShapeTextProps(getCenterPoint(schema), schema.textArea);

  const shapeHitbox = rectHitbox(schema);
  const efficientHitbox = rectEfficientHitbox(schema);
  const hitbox = (point: Coordinate) =>
    text?.textHitbox(point) || shapeHitbox(point);

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
