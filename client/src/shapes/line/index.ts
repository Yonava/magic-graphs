import type {
  Coordinate,
  GradientStop,
  Shape,
  TextAreaNoLocation,
} from '@shape/types';
import { drawLineWithCtx } from './draw';
import { lineHitbox, lineEfficientHitbox, getLineBoundingBox } from './hitbox';
import {
  lineTextHitbox,
  drawTextAreaOnLine,
  drawTextAreaMatteOnLine,
  drawTextOnLine,
  getTextAreaLocationOnLine,
} from './text';
import { generateId } from '@utils/id';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';

export type Line = {
  id?: string;
  start: Coordinate;
  end: Coordinate;
  width?: number;
  textArea?: TextAreaNoLocation;
  /**
   * offsetFromCenter is used to position text. By default, text is centered on the line.
   * If -10, text will be on the line but 10 units towards the start.
   * If 10, text will be on the line but 10 units away from the start.
   */
  textOffsetFromCenter?: number;
  color?: string;
  /**
   * dash: [dashLength, gapLength]
   */
  dash?: [number, number];
  gradientStops?: GradientStop[];
};

export const LINE_DEFAULTS = {
  width: 10,
  textOffsetFromCenter: 0,
  color: 'black',
  dash: [],
  gradientStops: [],
} as const;

export const line = (options: Line): Shape => {
  if (options.width && options.width < 0) {
    throw new Error('lineWidth must be positive');
  }

  const drawShape = drawLineWithCtx(options);

  const shapeHitbox = lineHitbox(options);
  const textHitbox = lineTextHitbox(options);
  const efficientHitbox = lineEfficientHitbox(options);
  const hitbox = (point: Coordinate) => {
    return textHitbox?.(point) || shapeHitbox(point);
  };

  const getBoundingBox = getLineBoundingBox(options);

  const drawTextArea = drawTextAreaOnLine(options);

  const drawTextAreaMatte = drawTextAreaMatteOnLine(options);
  const drawText = drawTextOnLine(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    drawTextArea?.(ctx);
  };

  const activateTextArea = (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => {
    if (!options.textArea) return;
    const location = getTextAreaLocationOnLine(options);
    const fullTextArea = getFullTextArea(options.textArea, location);
    engageTextarea(ctx, fullTextArea, handler);
  };

  return {
    id: options.id ?? generateId(),
    name: 'line',

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
