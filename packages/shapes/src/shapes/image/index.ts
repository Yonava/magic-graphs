import { getCenterPoint } from '../../helpers';
import { shapeFactoryWrapper } from '../../shapeWrapper';
import { getShapeTextProps } from '../../text/text';
import type { ShapeFactory } from '../../types';
import type { Coordinate } from '../../types/utility';
import { rect } from '../rect';

import { resolveImageDefaults } from './defaults';
import { drawImageWithCtx } from './draw';
import type { ImageSchema } from './types';

export const image: ShapeFactory<ImageSchema> = (options) => {
  if (options.width < 0 || options.height < 0) {
    throw new Error('width and height must be positive');
  }

  const schema = resolveImageDefaults(options);
  const text = getShapeTextProps(getCenterPoint(schema), schema.textArea);

  const drawShape = drawImageWithCtx(schema);

  const { shapeHitbox, efficientHitbox, getBoundingBox } = rect(schema);
  const hitbox = (point: Coordinate) =>
    text?.textHitbox(point) || shapeHitbox(point);

  const draw = async (ctx: CanvasRenderingContext2D) => {
    await drawShape(ctx);
    text?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'image',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,

    getBoundingBox,

    ...text,
  });
};
