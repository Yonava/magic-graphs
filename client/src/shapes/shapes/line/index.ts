import { drawLineWithCtx } from './draw';
import { lineHitbox, lineEfficientHitbox, getLineBoundingBox } from './hitbox';
import {
  lineTextHitbox,
  drawTextAreaOnLine,
  drawTextAreaMatteOnLine,
  drawTextOnLine,
  getTextAreaLocationOnLine,
} from './text';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';
import type { Coordinate, GradientStop, TextArea } from '@shape/types/utility';
import type { ShapeFactory } from '@shape/types';

export type LineSchema = {
  start: Coordinate;
  end: Coordinate;

  lineWidth?: number;
  textArea?: TextArea;
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
  gradientStops?: readonly GradientStop[];
};

export const LINE_SCHEMA_DEFAULTS = {
  lineWidth: 10,
  textOffsetFromCenter: 0,
  color: 'black',
  gradientStops: [] as LineSchema['gradientStops'],
} as const;

export const line: ShapeFactory<LineSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const drawShape = drawLineWithCtx(options);

  const shapeHitbox = lineHitbox(options);
  const textHitbox = lineTextHitbox(options);
  const efficientHitbox = lineEfficientHitbox(options);
  const hitbox = (point: Coordinate) => textHitbox?.(point) || shapeHitbox(point);

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
