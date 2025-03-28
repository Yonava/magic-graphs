import type {
  Coordinate,
  Stroke,
  TextAreaNoLocation,
  Shape,
} from '@shape/types';
import { drawEllipseWithCtx } from '@shape/ellipse/draw';
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
import { generateId } from '@utils/id';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';
import { CIRCLE_DEFAULTS } from '@shape/circle';

export type Ellipse = {
  id?: string;
  at: Coordinate;
  radiusX: number;
  radiusY: number;
  color?: string;
  stroke?: Stroke;
  textArea?: TextAreaNoLocation;
};

export const ELLIPSE_DEFAULTS = CIRCLE_DEFAULTS;

export const ellipse = (options: Ellipse): Shape => {
  if (options.radiusX < 0 || options.radiusY < 0) {
    throw new Error('radius must be positive');
  }

  const drawShape = drawEllipseWithCtx(options);

  const shapeHitbox = ellipseHitbox(options);
  const textHitbox = ellipseTextHitbox(options);
  const efficientHitbox = ellipseEfficientHitbox(options);
  const hitbox = (point: Coordinate) => {
    return textHitbox?.(point) || shapeHitbox(point);
  };

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
    id: generateId(),
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
