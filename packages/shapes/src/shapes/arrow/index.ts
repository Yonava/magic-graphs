import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types.ts';
import type { Coordinate } from '../../types/utility.ts';
import { getTextAreaAnchorPoint } from '../line/text.ts';
import { resolveArrowDefaults } from './defaults';
import { drawArrowWithCtx } from './draw';
import {
  arrowEfficientHitbox,
  arrowHitbox,
  getArrowBoundingBox,
} from './hitbox';
import type { ArrowSchema } from './types.ts';

export const arrow: ShapeFactory<ArrowSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('width must be positive');
  }

  const schema = resolveArrowDefaults(options);

  const anchorPt = getTextAreaAnchorPoint(schema);
  const text = getShapeTextProps(anchorPt, schema.textArea);

  const drawShape = drawArrowWithCtx(schema);

  const shapeHitbox = arrowHitbox(schema);
  const efficientHitbox = arrowEfficientHitbox(schema);
  const hitbox = (point: Coordinate) =>
    text?.textHitbox(point) || shapeHitbox(point);

  const getBoundingBox = getArrowBoundingBox(schema);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'arrow',

    draw,

    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...text,
  });
};
