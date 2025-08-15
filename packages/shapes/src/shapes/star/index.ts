import { shapeFactoryWrapper } from '../../shapeWrapper';
import { getShapeTextProps } from '../../text/text';
import type { ShapeFactory } from '../../types';
import type { Coordinate } from '../../types/utility';

import { resolveStarDefaults } from './defaults';
import { drawStarWithCtx } from './draw';
import { getStarBoundingBox, starEfficientHitbox, starHitbox } from './hitbox';
import type { StarSchema } from './types';

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

  const text = getShapeTextProps(schema.at, schema.textArea);

  const drawShape = drawStarWithCtx(schema);
  const draw = (ctx: CanvasRenderingContext2D) => {
    drawShape(ctx);
    text?.drawTextArea(ctx);
  };

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

    ...text,
  });
};
