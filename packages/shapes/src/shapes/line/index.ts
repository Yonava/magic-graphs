import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types.ts';
import type { Coordinate } from '../../types/utility.ts';
import { resolveLineDefaults } from './defaults';
import { drawLineWithCtx } from './draw';
import { getLineBoundingBox, lineEfficientHitbox, lineHitbox } from './hitbox';
import { getTextAreaAnchorPoint } from './text';
import type { LineSchema } from './types';

export const line: ShapeFactory<LineSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const schema = resolveLineDefaults(options);

  const anchorPt = getTextAreaAnchorPoint(schema);
  const text = getShapeTextProps(anchorPt, schema.textArea);

  const shapeHitbox = lineHitbox(schema);
  const efficientHitbox = lineEfficientHitbox(schema);
  const hitbox = (point: Coordinate) =>
    text?.textHitbox(point) || shapeHitbox(point);

  const getBoundingBox = getLineBoundingBox(schema);

  const drawShape = drawLineWithCtx(schema);
  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'line',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...text,
  });
};
