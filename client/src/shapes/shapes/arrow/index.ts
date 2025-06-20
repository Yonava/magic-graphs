import type { Coordinate } from '@shape/types/utility';
import type { Shape, ShapeFactory } from '@shape/types';
import { drawArrowWithCtx } from './draw';
import {
  arrowHitbox,
  arrowEfficientHitbox,
  getArrowBoundingBox,
} from './hitbox';
import { getArrowHeadSize } from '@shape/helpers';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';
import { getTextAreaAnchorPoint } from '../line/text';
import type { LineSchema } from '../line/types';
import { LINE_SCHEMA_DEFAULTS } from '../line/defaults';

export const ARROW_SCHEMA_DEFAULTS = {
  ...LINE_SCHEMA_DEFAULTS,
  arrowHeadSize: getArrowHeadSize,
} as const satisfies Partial<ArrowSchema>;

export type ArrowSchema = LineSchema & {
  arrowHeadSize?: (width: number) => {
    arrowHeadHeight: number;
    perpLineLength: number;
  };
  arrowHeadShape?: (at: Coordinate, height: number, width: number) => Shape;
};

export const arrow: ShapeFactory<ArrowSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('width must be positive');
  }

  const anchorPt = getTextAreaAnchorPoint(options)
  const shapeTextProps = getShapeTextProps(anchorPt, options.textArea)

  const drawShape = drawArrowWithCtx(options);

  const shapeHitbox = arrowHitbox(options);

  const efficientHitbox = arrowEfficientHitbox(options);
  const hitbox = (point: Coordinate) =>
    shapeTextProps?.textHitbox(point) || shapeHitbox(point);

  const getBoundingBox = getArrowBoundingBox(options);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    shapeTextProps?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'arrow',

    draw,

    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...shapeTextProps,
  });
};
