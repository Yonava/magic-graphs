import type {
  Coordinate,
  Stroke,
  TextAreaNoLocation,
  ShapeFactory,
} from '@shape/types';
import { drawCircleWithCtx } from '@shape/circle/draw';
import {
  circleHitbox,
  circleEfficientHitbox,
  getCircleBoundingBox,
} from './hitbox';
import {
  circleTextHitbox,
  drawTextAreaOnCircle,
  drawTextAreaMatteOnCircle,
  drawTextOnCircle,
  getTextAreaLocationOnCircle,
} from './text';
import { generateId } from '@utils/id';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';

export type CircleSchema = {
  id?: string;
  at: Coordinate;
  radius: number;
  color?: string;
  stroke?: Stroke;
  textArea?: TextAreaNoLocation;
};

export const CIRCLE_SCHEMA_DEFAULTS = {
  color: 'black',
} as const;

export const circle: ShapeFactory<CircleSchema> = (options) => {
  if (options.radius < 0) {
    throw new Error('radius must be positive');
  }

  const drawShape = drawCircleWithCtx(options);

  const shapeHitbox = circleHitbox(options);
  const textHitbox = circleTextHitbox(options);
  const efficientHitbox = circleEfficientHitbox(options);
  const hitbox = (point: Coordinate) => textHitbox?.(point) || shapeHitbox(point);

  const getBoundingBox = getCircleBoundingBox(options);

  const drawTextArea = drawTextAreaOnCircle(options);

  const drawTextAreaMatte = drawTextAreaMatteOnCircle(options);
  const drawText = drawTextOnCircle(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    drawTextArea?.(ctx);
  };

  const activateTextArea = (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => {
    if (!options.textArea) return;
    const location = getTextAreaLocationOnCircle(options);
    const fullTextArea = getFullTextArea(options.textArea, location);
    engageTextarea(ctx, fullTextArea, handler);
  };

  return {
    id: options.id ?? generateId(),
    name: 'circle',

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
