import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types/index.ts';
import type { Coordinate } from '../../types/utility.ts';
import { resolveLineDefaults } from './defaults.ts';
import { drawLineWithCtx } from './draw.ts';
import {
  getLineBoundingBox,
  lineEfficientHitbox,
  lineHitbox,
} from './hitbox.ts';
import { getTextAreaAnchorPoint } from './text.ts';
import type { LineSchema } from './types.ts';

export const line: ShapeFactory<LineSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const schema = resolveLineDefaults(options);

  const anchorPt = getTextAreaAnchorPoint(schema);
  const drawShape = drawLineWithCtx(schema);
  const text = getShapeTextProps(anchorPt, schema.textArea, drawShape);
  const { drawOverride, ...textProps } = text ?? {};

  const shapeHitbox = lineHitbox(schema);
  const efficientHitbox = lineEfficientHitbox(schema);
  const hitbox = (point: Coordinate) =>
    text?.textHitbox(point) || shapeHitbox(point);

  const getBoundingBox = getLineBoundingBox(schema);

  const draw =
    drawOverride ??
    ((ctx: CanvasRenderingContext2D) => {
      drawShape(ctx);
      text?.drawTextArea(ctx);
    });

  return shapeFactoryWrapper({
    name: 'line',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...textProps,
  });
};
