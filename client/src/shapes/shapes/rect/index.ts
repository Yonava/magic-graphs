import { rectHitbox, rectEfficientHitbox, getRectBoundingBox } from './hitbox';
import { drawRectWithCtx } from './draw';
import type { Coordinate } from '@shape/types/utility';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { validateBorderRadius } from '../../optionsValidator';
import { getShapeTextProps } from '@shape/text/text';
import { getCenterPoint } from '@shape/helpers';
import type { RectSchema } from './types';

export const rect: ShapeFactory<RectSchema> = (options) => {
  validateBorderRadius(options);

  const drawShape = drawRectWithCtx(options);

  const shapeHitbox = rectHitbox(options);
  const efficientHitbox = rectEfficientHitbox(options);

  const getBoundingBox = getRectBoundingBox(options);

  const shapeTextProps = getShapeTextProps(getCenterPoint(options), options.textArea)

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    shapeTextProps?.drawTextArea(ctx);
  };

  const hitbox = (point: Coordinate) =>
    shapeTextProps?.textHitbox(point) || shapeHitbox(point);

  return shapeFactoryWrapper({
    name: 'rect',

    draw,

    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...shapeTextProps,
  });
};
