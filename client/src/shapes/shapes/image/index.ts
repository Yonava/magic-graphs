import { drawImageWithCtx } from './draw';
import {
  getImageBoundingBox,
  imageEfficientHitbox,
  imageHitbox,
} from './hitbox';
import {
  drawTextAreaOnImage,
  drawTextAreaMatteOnImage,
  drawTextOnImage,
  getTextAreaLocationOnImage,
  imageTextHitbox,
} from './text';
import { RECT_SCHEMA_DEFAULTS } from '@shape/shapes/rect';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';
import type { ShapeFactory } from '@shape/types';
import type { Coordinate } from '@shape/types/utility';
import type { LoadImageOptions } from './cache';
import type { AnchorPoint, Rotation, TextArea } from '@shape/types/schema';
import { factoryWrapper } from '@shape/factories';

export type ImageSchema = AnchorPoint &
  Rotation &
  TextArea & {
    src: string;
    width: number;
    height: number;
  } & Partial<LoadImageOptions>;

export const IMAGE_SCHEMA_DEFAULTS = {
  ...RECT_SCHEMA_DEFAULTS,
} as const satisfies Partial<ImageSchema>;

export const image: ShapeFactory<ImageSchema> = (options) => {
  if (options.width < 0 || options.height < 0) {
    throw new Error('width and height must be positive');
  }

  const drawShape = drawImageWithCtx(options);
  const shapeHitbox = imageHitbox(options);
  const textHitbox = imageTextHitbox(options);
  const efficientHitbox = imageEfficientHitbox(options);
  const hitbox = (point: Coordinate) =>
    textHitbox?.(point) || shapeHitbox(point);
  const getBoundingBox = getImageBoundingBox(options);

  const drawTextArea = drawTextAreaOnImage(options);
  const drawTextAreaMatte = drawTextAreaMatteOnImage(options);
  const drawText = drawTextOnImage(options);

  const draw = async (ctx: CanvasRenderingContext2D) => {
    await drawShape(ctx);
    drawTextArea?.(ctx);
  };

  const activateTextArea = (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => {
    if (!options.textArea) return;
    const location = getTextAreaLocationOnImage(options);
    const fullTextArea = getFullTextArea(options.textArea, location);
    engageTextarea(ctx, fullTextArea, handler);
  };

  return factoryWrapper({
    name: 'image',

    draw,
    drawShape,
    drawTextArea,
    drawTextAreaMatte,
    drawText,

    hitbox,
    shapeHitbox,
    textHitbox,
    efficientHitbox,

    getBoundingBox,

    activateTextArea,
  });
};
