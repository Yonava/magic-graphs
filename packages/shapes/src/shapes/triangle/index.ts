import { getCenterPoint } from '../../helpers';
import { shapeFactoryWrapper } from '../../shapeWrapper';
import { getShapeTextProps } from '../../text/text';
import type { ShapeFactory } from '../../types';
import type { Coordinate } from '../../types/utility';

import { resolveTriangleDefaults } from './defaults';
import { drawTriangleWithCtx } from './draw';
import {
  getTriangleBoundingBox,
  triangleEfficientHitbox,
  triangleHitbox,
} from './hitbox';
import type { TriangleSchema } from './types';

export const triangle: ShapeFactory<TriangleSchema> = (options) => {
  const schema = resolveTriangleDefaults(options);

  const getBoundingBox = getTriangleBoundingBox(schema);
  const anchorPt = getCenterPoint(getBoundingBox());
  const text = getShapeTextProps(anchorPt, schema.textArea);

  const shapeHitbox = triangleHitbox(schema);
  const efficientHitbox = triangleEfficientHitbox(schema);
  const hitbox = (pt: Coordinate) => text?.textHitbox(pt) || shapeHitbox(pt);

  const drawShape = drawTriangleWithCtx(schema);
  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'triangle',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...text,
  });
};
