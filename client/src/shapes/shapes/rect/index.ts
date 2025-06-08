import { rectHitbox, rectEfficientHitbox, getRectBoundingBox } from './hitbox';
import { drawRectWithCtx } from './draw';
import {
  rectTextHitbox,
  drawTextAreaOnRect,
  drawTextAreaMatteOnRect,
  drawTextOnRect,
  getTextAreaLocationOnRect,
} from './text';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';
import type {
  AnchorPoint,
  FillColor,
  BorderRadius,
  Rotation,
  Stroke,
  TextArea,
} from '@shape/types/schema';
import type { Coordinate } from '@shape/types/utility';
import type { ShapeFactory } from '@shape/types';
import {
  BACKGROUND_COLOR_DEFAULTS,
  BORDER_RADIUS_DEFAULTS,
  ROTATION_DEFAULTS,
} from '@shape/defaults/schema';
import { factoryWrapper } from '@shape/factories';

export type RectSchema = AnchorPoint &
  FillColor &
  Stroke &
  TextArea &
  BorderRadius &
  Rotation & {
    width: number;
    height: number;
  };

export const RECT_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
  ...BORDER_RADIUS_DEFAULTS,
  ...ROTATION_DEFAULTS,
} as const satisfies Partial<RectSchema>;

export const rect: ShapeFactory<RectSchema> = (options) => {
  if (options.borderRadius && options.borderRadius < 0) {
    throw new Error('borderRadius must be positive');
  }

  const drawShape = drawRectWithCtx(options);

  const shapeHitbox = rectHitbox(options);
  const textHitbox = rectTextHitbox(options);
  const efficientHitbox = rectEfficientHitbox(options);
  const hitbox = (point: Coordinate) =>
    textHitbox?.(point) || shapeHitbox(point);

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

  return factoryWrapper({
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
  });
};
