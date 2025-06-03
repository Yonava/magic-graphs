import type {
  Coordinate,
  GradientStop,
  Shape,
  ShapeFactory,
  TextAreaNoLocation,
} from '@shape/types';
import { drawUTurnWithCtx } from './draw';
import {
  uturnHitbox,
  uturnEfficientHitbox,
  getUTurnBoundingBox,
} from './hitbox';
import {
  drawTextAreaMatteOnUTurn,
  drawTextAreaOnUTurn,
  drawTextOnUTurn,
  getTextAreaLocationOnUTurn,
  uturnTextHitbox,
} from './text';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';
import { getArrowHeadSize } from '@shape/helpers';

export type UTurnSchema = {
  at: Coordinate;
  spacing: number;
  upDistance: number;
  downDistance: number;
  rotation: number;
  lineWidth: number;

  color?: string;
  textArea?: TextAreaNoLocation;
  arrowHeadSize?: (width: number) => {
    arrowHeadHeight: number;
    perpLineLength: number;
  };
  arrowHeadShape?: (at: Coordinate, height: number, width: number) => Shape;
  gradientStops?: readonly GradientStop[];
};

export const UTURN_SCHEMA_DEFAULTS = {
  color: 'black',
  arrowHeadSize: getArrowHeadSize,
  gradientStops: [] as readonly GradientStop[],
} as const;

export const uturn: ShapeFactory<UTurnSchema> = (options) => {
  if (options.downDistance < 0) {
    throw new Error('downDistance must be positive');
  }

  if (options.upDistance < 0) {
    throw new Error('upDistance must be positive');
  }

  const drawShape = drawUTurnWithCtx(options);

  const shapeHitbox = uturnHitbox(options);
  const textHitbox = uturnTextHitbox(options);
  const efficientHitbox = uturnEfficientHitbox(options);
  const hitbox = (point: Coordinate) => {
    return textHitbox?.(point) || shapeHitbox(point);
  };

  const getBoundingBox = getUTurnBoundingBox(options);

  const drawTextArea = drawTextAreaOnUTurn(options);

  const drawTextAreaMatte = drawTextAreaMatteOnUTurn(options);
  const drawText = drawTextOnUTurn(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    drawTextArea?.(ctx);
  };

  const activateTextArea = (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => {
    if (!options.textArea) return;
    const location = getTextAreaLocationOnUTurn(options);
    const fullTextArea = getFullTextArea(options.textArea, location);
    engageTextarea(ctx, fullTextArea, handler);
  };

  return {
    name: 'uturn',

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
