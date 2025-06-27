import { drawLineWithCtx } from './draw';
import { lineHitbox, lineEfficientHitbox, getLineBoundingBox } from './hitbox';
import type { Coordinate } from '@shape/types/utility';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';
import { getTextAreaAnchorPoint } from './text';
import type { LineSchema } from './types';
import { resolveLineDefaults } from './defaults';

export const line: ShapeFactory<LineSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('lineWidth must be positive');
  }

  const schema = resolveLineDefaults(options)

  const anchorPt = getTextAreaAnchorPoint(schema)
  const text = getShapeTextProps(anchorPt, schema.textArea)

  const shapeHitbox = lineHitbox(schema);
  const efficientHitbox = lineEfficientHitbox(schema);
  const hitbox = (point: Coordinate) => text?.textHitbox(point) || shapeHitbox(point);

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
