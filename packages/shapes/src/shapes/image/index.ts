import { getCenterPoint } from '../../helpers.ts';
import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types/index.ts';
import type { Coordinate } from '../../types/utility.ts';
import { rect } from '../rect/index.ts';
import { resolveImageDefaults } from './defaults.ts';
import { drawImageWithCtx } from './draw.ts';
import type { ImageSchema } from './types.ts';

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
