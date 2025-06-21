import { drawImageWithCtx } from './draw';
import {
  getImageBoundingBox,
  imageEfficientHitbox,
  imageHitbox,
} from './hitbox';
import type { ShapeFactory } from '@shape/types';
import type { Coordinate } from '@shape/types/utility';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';
import { getCenterPoint } from '@shape/helpers';
import type { ImageSchema } from './types';

export const image: ShapeFactory<ImageSchema> = (options) => {
  if (options.width < 0 || options.height < 0) {
    throw new Error('width and height must be positive');
  }

  const shapeTextProps = getShapeTextProps(getCenterPoint(options), options.textArea)

  const drawShape = drawImageWithCtx(options);
  const shapeHitbox = imageHitbox(options);
  const efficientHitbox = imageEfficientHitbox(options);
  const hitbox = (point: Coordinate) =>
    shapeTextProps?.textHitbox(point) || shapeHitbox(point);

  const getBoundingBox = getImageBoundingBox(options);

  const draw = async (ctx: CanvasRenderingContext2D) => {
    await drawShape(ctx);
    shapeTextProps?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'image',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,

    getBoundingBox,

    ...shapeTextProps
  });
};
