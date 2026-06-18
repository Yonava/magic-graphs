import { getCenterPoint } from '../../helpers.ts';
import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types/index.ts';
import type { Coordinate } from '../../types/utility.ts';
import { resolveTriangleDefaults } from './defaults.ts';
import { drawTriangleWithCtx } from './draw.ts';
import {
  getTriangleBoundingBox,
  triangleEfficientHitbox,
  triangleHitbox,
} from './hitbox.ts';
import type { TriangleSchema } from './types.ts';

export const triangle: ShapeFactory<TriangleSchema> = (options) => {
  const schema = resolveTriangleDefaults(options);

  const getBoundingBox = getTriangleBoundingBox(schema);
  const anchorPt = getCenterPoint(getBoundingBox());
  const drawShape = drawTriangleWithCtx(schema);
  const text = getShapeTextProps(anchorPt, schema.textArea, drawShape);
  const { drawOverride, ...textProps } = text ?? {};

  const shapeHitbox = triangleHitbox(schema);
  const efficientHitbox = triangleEfficientHitbox(schema);
  const hitbox = (pt: Coordinate) => text?.textHitbox(pt) || shapeHitbox(pt);

  const draw = drawOverride ?? ((ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  });

  return shapeFactoryWrapper({
    name: 'triangle',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...textProps,
  });
};
