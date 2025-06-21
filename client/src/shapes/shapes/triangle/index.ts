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

export const triangle: ShapeFactory<TriangleSchema> = (options) => {
  const getBoundingBox = getTriangleBoundingBox(options);
  const shapeTextProps = getShapeTextProps(getCenterPoint(getBoundingBox()), options.textArea)

  const drawShape = drawTriangleWithCtx(options);
  const shapeHitbox = triangleHitbox(options);
  const efficientHitbox = triangleEfficientHitbox(options);
  const hitbox = shapeHitbox;

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    shapeTextProps?.drawTextArea(ctx);
  };

  return shapeFactoryWrapper({
    name: 'triangle',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...shapeTextProps,
  });
};
