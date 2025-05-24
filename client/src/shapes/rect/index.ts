import type {
  TextAreaNoLocation,
  Stroke,
  Coordinate,
  ShapeFactory,
} from '@shape/types';
import { rectHitbox, rectEfficientHitbox, getRectBoundingBox } from './hitbox';
import { drawRectWithCtx } from './draw';
import {
  rectTextHitbox,
  drawTextAreaOnRect,
  drawTextAreaMatteOnRect,
  drawTextOnRect,
  getTextAreaLocationOnRect,
} from './text';
import { generateId } from '@utils/id';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';

export type RectSchema = {
  id?: string;
  at: Coordinate;
  width: number;
  height: number;
  color?: string;
  stroke?: Stroke;
  textArea?: TextAreaNoLocation;
  borderRadius?: number;
  rotation?: number;
};

export const RECT_SCHEMA_DEFAULTS = {
  color: 'black',
  borderRadius: 0,
  rotation: 0,
} as const;

export const rect: ShapeFactory<RectSchema> = (options) => {
  if (options.borderRadius && options.borderRadius < 0) {
    throw new Error('borderRadius must be positive');
  }

  const drawShape = drawRectWithCtx(options);

  const shapeHitbox = rectHitbox(options);
  const textHitbox = rectTextHitbox(options);
  const efficientHitbox = rectEfficientHitbox(options);
  const hitbox = (point: Coordinate) => {
    return textHitbox?.(point) || shapeHitbox(point);
  };

  const getBoundingBox = getRectBoundingBox(options);

  const drawTextArea = drawTextAreaOnRect(options);

  const drawTextAreaMatte = drawTextAreaMatteOnRect(options);
  const drawText = drawTextOnRect(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    drawTextArea?.(ctx);
  };

  const activateTextArea = (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => {
    if (!options.textArea) return;
    const location = getTextAreaLocationOnRect(options);
    const fullTextArea = getFullTextArea(options.textArea, location);
    engageTextarea(ctx, fullTextArea, handler);
  };

  return {
    id: options.id ?? generateId(),
    name: 'rect',

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
