import { drawImageWithCtx } from './draw';
import {
  getImageBoundingBox,
  imageEfficientHitbox,
  imageHitbox,
} from './hitbox';
import { RECT_SCHEMA_DEFAULTS } from '@shape/shapes/rect';
import type { ShapeFactory } from '@shape/types';
import type { Coordinate } from '@shape/types/utility';
import type { LoadImageOptions } from './cache';
import type { AnchorPoint, Rotation, TextArea } from '@shape/types/schema';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';
import { getCenterPoint } from '@shape/helpers';

export type ImageSchema = {
  src: string;
  width: number;
  height: number;
} & Partial<LoadImageOptions> &
  AnchorPoint &
  Rotation &
  TextArea;

export const IMAGE_SCHEMA_DEFAULTS = {
  ...RECT_SCHEMA_DEFAULTS,
} as const satisfies Partial<ImageSchema>;

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
