import { LINE_SCHEMA_DEFAULTS } from '@shape/shapes/line';
import type { LineSchema } from '@shape/shapes/line';
import type { Coordinate } from '@shape/types/utility';
import type { Shape, ShapeFactory } from '@shape/types';
import { drawArrowWithCtx } from './draw';
import {
  arrowHitbox,
  arrowEfficientHitbox,
  getArrowBoundingBox,
} from './hitbox';
import { engageTextarea } from '@shape/textarea';
import {
  arrowTextHitbox,
  drawTextOnArrow,
  drawTextAreaMatteOnArrow,
  drawTextAreaOnArrow,
  getTextAreaLocationOnArrow,
} from './text';
import { getFullTextArea } from '@shape/text';
import { getArrowHeadSize } from '@shape/helpers';
import { factoryWrapper } from '@shape/factories';

export type ArrowSchema = LineSchema & {
  arrowHeadSize?: (width: number) => {
    arrowHeadHeight: number;
    perpLineLength: number;
  };
  arrowHeadShape?: (at: Coordinate, height: number, width: number) => Shape;
};

export const ARROW_SCHEMA_DEFAULTS = {
  ...LINE_SCHEMA_DEFAULTS,
  arrowHeadSize: getArrowHeadSize,
} as const satisfies Partial<ArrowSchema>;

export const arrow: ShapeFactory<ArrowSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('width must be positive');
  }

  const drawShape = drawArrowWithCtx(options);

  const shapeHitbox = arrowHitbox(options);
  const textHitbox = arrowTextHitbox(options);
  const efficientHitbox = arrowEfficientHitbox(options);
  const hitbox = (point: Coordinate) =>
    textHitbox?.(point) || shapeHitbox(point);

  const getBoundingBox = getArrowBoundingBox(options);

  const drawTextArea = drawTextAreaOnArrow(options);

  const drawTextAreaMatte = drawTextAreaMatteOnArrow(options);
  const drawText = drawTextOnArrow(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    drawTextArea?.(ctx);
  };

  const activateTextArea = (
    ctx: CanvasRenderingContext2D,
    handler: (str: string) => void,
  ) => {
    if (!options.textArea) return;
    const location = getTextAreaLocationOnArrow(options);
    const fullTextArea = getFullTextArea(options.textArea, location);
    engageTextarea(ctx, fullTextArea, handler);
  };

  return factoryWrapper({
    name: 'arrow',

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
