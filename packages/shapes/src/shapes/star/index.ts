import { shapeFactoryWrapper } from '../../shapeWrapper.ts';
import { getShapeTextProps } from '../../text/text.ts';
import type { ShapeFactory } from '../../types/index.ts';
import type { Coordinate } from '../../types/utility.ts';
import { resolveStarDefaults } from './defaults.ts';
import { drawStarWithCtx } from './draw.ts';
import {
  getStarBoundingBox,
  starEfficientHitbox,
  starHitbox,
} from './hitbox.ts';
import type { StarSchema } from './types.ts';

export const star: ShapeFactory<StarSchema> = (options) => {
  const schema = resolveStarDefaults(options);

  if (schema.points < 3) {
    console.warn('star must have at least 3 points');
  }
  if (schema.innerRadius >= schema.outerRadius) {
    console.warn('inner radius must be less than outer radius');
  }
  if (schema.innerRadius < 0 || schema.outerRadius < 0) {
    console.warn('radius values must be positive');
  }

  const drawShape = drawStarWithCtx(schema);
  const text = getShapeTextProps(schema.at, schema.textArea, drawShape);
  const { drawOverride, ...textProps } = text ?? {};
  const draw = drawOverride ?? ((ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  });

  const shapeHitbox = starHitbox(schema);
  const hitbox = (pt: Coordinate) => text?.textHitbox(pt) || shapeHitbox(pt);
  const efficientHitbox = starEfficientHitbox(schema);
  const getBoundingBox = getStarBoundingBox(schema);

  return shapeFactoryWrapper({
    name: 'star',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...textProps,
  });
};
