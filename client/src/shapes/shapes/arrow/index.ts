import type { Coordinate } from '@shape/types/utility';
import type { ShapeFactory } from '@shape/types';
import { drawArrowWithCtx } from './draw';
import {
  arrowHitbox,
  arrowEfficientHitbox,
  getArrowBoundingBox,
} from './hitbox';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';
import { getTextAreaAnchorPoint } from '../line/text';
import type { ArrowSchema } from './types';
import { resolveArrowDefaults } from './defaults';

export const arrow: ShapeFactory<ArrowSchema> = (options) => {
  if (options.lineWidth && options.lineWidth < 0) {
    throw new Error('width must be positive');
  }

  const schema = resolveArrowDefaults(options)

  const anchorPt = getTextAreaAnchorPoint(schema)
  const text = getShapeTextProps(anchorPt, schema.textArea)

  const drawShape = drawArrowWithCtx(schema);

  const shapeHitbox = arrowHitbox(schema);
  const efficientHitbox = arrowEfficientHitbox(schema);
  const hitbox = (point: Coordinate) => text?.textHitbox(point) || shapeHitbox(point);

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
