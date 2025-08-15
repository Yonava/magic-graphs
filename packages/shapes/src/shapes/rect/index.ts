import { getCenterPoint } from '../../helpers';
import { shapeFactoryWrapper } from '../../shapeWrapper';
import { getShapeTextProps } from '../../text/text';
import type { ShapeFactory } from '../../types';
import type { Coordinate } from '../../types/utility';

import { validateBorderRadius } from '../../optionsValidator';
import { resolveRectDefaults } from './defaults';
import { drawRectWithCtx } from './draw';
import { getRectBoundingBox, rectEfficientHitbox, rectHitbox } from './hitbox';
import type { RectSchema } from './types';

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
