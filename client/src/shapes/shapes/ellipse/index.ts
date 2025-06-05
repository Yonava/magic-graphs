import type { Coordinate } from '@shape/types/utility';
import { drawEllipseWithCtx } from '@shape/shapes/ellipse/draw';
import {
  ellipseHitbox,
  ellipseEfficientHitbox,
  getEllipseBoundingBox,
} from './hitbox';
import {
  ellipseTextHitbox,
  drawTextAreaOnEllipse,
  drawTextAreaMatteOnEllipse,
  drawTextOnEllipse,
  getTextAreaLocationOnEllipse,
} from './text';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';
import type { AnchorPoint, BackgroundColor, Stroke, TextArea } from '@shape/types/schema';
import type { ShapeFactory } from '@shape/types';
import { BACKGROUND_COLOR_DEFAULTS } from '@shape/defaults/schema';

export type EllipseSchema = AnchorPoint & BackgroundColor & Stroke & TextArea & {
  radiusX: number;
  radiusY: number;
};

export const ELLIPSE_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
} as const satisfies Partial<EllipseSchema>

export const ellipse: ShapeFactory<EllipseSchema> = (options) => {
  if (options.radiusX < 0 || options.radiusY < 0) {
    throw new Error('radius must be positive');
  }

  const drawShape = drawEllipseWithCtx(options);

  const shapeHitbox = ellipseHitbox(options);
  const textHitbox = ellipseTextHitbox(options);
  const efficientHitbox = ellipseEfficientHitbox(options);
  const hitbox = (point: Coordinate) =>
    textHitbox?.(point) || shapeHitbox(point);

  const getBoundingBox = getEllipseBoundingBox(options);

  const drawTextArea = drawTextAreaOnEllipse(options);

  const drawTextAreaMatte = drawTextAreaMatteOnEllipse(options);
  const drawText = drawTextOnEllipse(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    drawTextArea?.(ctx);
  };

  const activateTextArea = (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => {
    if (!options.textArea) return;
    const location = getTextAreaLocationOnEllipse(options);
    const fullTextArea = getFullTextArea(options.textArea, location);
    engageTextarea(ctx, fullTextArea, handler);
  };

  return {
    name: 'ellipse',

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
