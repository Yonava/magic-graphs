import { drawLineWithCtx } from './draw';
import { lineHitbox, lineEfficientHitbox, getLineBoundingBox } from './hitbox';
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
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';
import { getTextAreaAnchorPoint } from './text';

export type LineSchema = {
  start: Coordinate;
  end: Coordinate;
  /**
   * offsetFromCenter is used to position text. By default, text is centered on the line.
   * If -10, text will be on the line but 10 units towards the start.
   * If 10, text will be on the line but 10 units away from the start.
   */
  textOffsetFromCenter?: number;
  dash?: DashPattern;
} & LineWidth &
  TextArea &
  FillColor &
  FillGradient;

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
  const efficientHitbox = lineEfficientHitbox(options);

  const anchorPt = getTextAreaAnchorPoint(options)
  const shapeTextProps = getShapeTextProps(anchorPt, options.textArea)

  const hitbox = (point: Coordinate) =>
    shapeTextProps?.textHitbox(point) || shapeHitbox(point);

  const getBoundingBox = getLineBoundingBox(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    shapeTextProps?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'line',

    draw,

    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...shapeTextProps,
  });
};
