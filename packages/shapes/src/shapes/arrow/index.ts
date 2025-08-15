import { shapeFactoryWrapper } from '../../shapeWrapper';
import { getShapeTextProps } from '../../text/text';
import type { ShapeFactory } from '../../types';
import type { Coordinate } from '../../types/utility';

import { getTextAreaAnchorPoint } from '../line/text';
import { resolveArrowDefaults } from './defaults';
import { drawArrowWithCtx } from './draw';
import {
  arrowEfficientHitbox,
  arrowHitbox,
  getArrowBoundingBox,
} from './hitbox';
import type { ArrowSchema } from './types';

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
