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
import type { Coordinate, TextArea } from '@shape/types/utility';
import colors from '@utils/colors';
import type { LoadImageOptions } from './cache';

export type ImageSchema = Partial<LoadImageOptions> & {
  at: Coordinate;
  width: number;
  height: number;

  src: string;

  color?: string;
  rotation?: number;
  textArea?: TextArea;
}

export const IMAGE_SCHEMA_DEFAULTS = {
  ...RECT_SCHEMA_DEFAULTS,
  color: colors.TRANSPARENT,
} as const;

export const image: ShapeFactory<ImageSchema> = (options) => {
  if (options.width < 0 || options.height < 0) {
    throw new Error('width and height must be positive');
  }

  const drawShape = drawImageWithCtx(options);
  const shapeHitbox = imageHitbox(options);
  const textHitbox = imageTextHitbox(options);
  const efficientHitbox = imageEfficientHitbox(options);
  const hitbox = (point: Coordinate) => textHitbox?.(point) || shapeHitbox(point);
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

  return {
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
  };
};
