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
import type { Coordinate } from '@shape/types/utility';
import type { Shape, ShapeFactory } from '@shape/types';
import {
  BACKGROUND_COLOR_DEFAULTS,
  LINE_WIDTH_DEFAULTS,
  ROTATION_DEFAULTS,
} from '@shape/defaults/schema';
import type {
  AnchorPoint,
  FillColor,
  FillGradient,
  LineWidth,
  Rotation,
  TextArea,
} from '@shape/types/schema';
import { withCenterPoint } from '@shape/factories';

export type UTurnSchema = AnchorPoint &
  Rotation &
  LineWidth &
  FillColor &
  TextArea &
  FillGradient & {
    spacing: number;
    upDistance: number;
    downDistance: number;
    arrowHeadSize?: (width: number) => {
      arrowHeadHeight: number;
      perpLineLength: number;
    };
    arrowHeadShape?: (at: Coordinate, height: number, width: number) => Shape;
  };

export const UTURN_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
  ...ROTATION_DEFAULTS,
  ...LINE_WIDTH_DEFAULTS,
  ...ROTATION_DEFAULTS,
  arrowHeadSize: getArrowHeadSize,
} as const satisfies Partial<UTurnSchema>;

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

  return withCenterPoint({
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
  });
};
