import type { Coordinate, ShapeFactory, TextAreaNoLocation } from '@shape/types';
import { generateId } from '@utils/id';
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
import { RECT_SCHEMA_DEFAULTS } from '@shape/rect';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';
import colors from '@utils/colors';

export type ImageSchema = {
  id?: string;
  at: Coordinate;
  width: number;
  height: number;
  src: string;
  rotation?: number;
  onLoad?: () => void;
  onLoadError?: () => void;
  color?: string;
  textArea?: TextAreaNoLocation;
};

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
  const hitbox = (point: Coordinate) => {
    return textHitbox?.(point) || shapeHitbox(point);
  };
  const getBoundingBox = getImageBoundingBox(options);

  const drawTextArea = drawTextAreaOnImage(options);
  const drawTextAreaMatte = drawTextAreaMatteOnImage(options);
  const drawText = drawTextOnImage(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
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
    id: options.id ?? generateId(),
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
