import {
  triangleHitbox,
  triangleEfficientHitbox,
  getTriangleBoundingBox,
} from './hitbox';
import { drawTriangleWithCtx } from './draw';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import { getShapeTextProps } from '@shape/text/text';
import { getCenterPoint } from '@shape/helpers';
import type { TriangleSchema } from './types';
import { resolveTriangleDefaults } from './defaults';
import type { Coordinate } from '@shape/types/utility';

export const triangle: ShapeFactory<TriangleSchema> = (options) => {
  const schema = resolveTriangleDefaults(options)

  const getBoundingBox = getTriangleBoundingBox(schema);
  const anchorPt = getCenterPoint(getBoundingBox())
  const text = getShapeTextProps(anchorPt, schema.textArea)

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
