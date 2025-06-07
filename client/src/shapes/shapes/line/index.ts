import { drawLineWithCtx } from './draw';
import {
  lineHitbox,
  lineEfficientHitbox,
  getLineBoundingBox,
  getLineCenterPoint,
} from './hitbox';
import {
  lineTextHitbox,
  drawTextAreaOnLine,
  drawTextAreaMatteOnLine,
  drawTextOnLine,
  getTextAreaLocationOnLine,
} from './text';
import { getFullTextArea } from '@shape/text';
import { engageTextarea } from '@shape/textarea';
import type { Coordinate, DashPattern } from '@shape/types/utility';
import type { ShapeFactory } from '@shape/types';
import type {
  FillColor,
  FillGradient,
  LineWidth,
  TextArea,
} from '@shape/types/schema';
import {
  BACKGROUND_COLOR_DEFAULTS,
  LINE_WIDTH_DEFAULTS,
} from '@shape/defaults/schema';

export type LineSchema = LineWidth &
  TextArea &
  FillColor &
  FillGradient & {
    start: Coordinate;
    end: Coordinate;
    /**
     * offsetFromCenter is used to position text. By default, text is centered on the line.
     * If -10, text will be on the line but 10 units towards the start.
     * If 10, text will be on the line but 10 units away from the start.
     */
    textOffsetFromCenter?: number;
    dash?: DashPattern;
  };

export const LINE_SCHEMA_DEFAULTS = {
  ...LINE_WIDTH_DEFAULTS,
  ...BACKGROUND_COLOR_DEFAULTS,
  textOffsetFromCenter: 0,
} as const satisfies Partial<LineSchema>;

export const line: ShapeFactory<LineSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const drawShape = drawLineWithCtx(options);

  const shapeHitbox = lineHitbox(options);
  const textHitbox = lineTextHitbox(options);
  const efficientHitbox = lineEfficientHitbox(options);
  const hitbox = (point: Coordinate) =>
    textHitbox?.(point) || shapeHitbox(point);

  const getBoundingBox = getLineBoundingBox(options);
  const getCenterPoint = getLineCenterPoint(options);

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
    getCenterPoint,

    activateTextArea,
  };
};
