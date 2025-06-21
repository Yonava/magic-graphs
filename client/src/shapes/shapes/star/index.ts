import { getStarBoundingBox, starEfficientHitbox, starHitbox } from './hitbox';
import { drawStarWithCtx } from './draw';
import type { ShapeFactory } from '@shape/types';
import { shapeFactoryWrapper } from '@shape/shapeWrapper';
import type { StarSchema } from './types';
import { getShapeTextProps } from '@shape/text/text';
import type { Coordinate } from '@shape/types/utility';

export const star: ShapeFactory<StarSchema> = (options) => {
  const shapeTextProps = getShapeTextProps(options.at, options.textArea)

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawStarWithCtx(options)(ctx)
    shapeTextProps?.drawTextArea(ctx)
  };

  const drawShape = drawStarWithCtx(options);

  const shapeHitbox = starHitbox(options);
  const hitbox = (point: Coordinate) => shapeTextProps?.textHitbox(point) || shapeHitbox(point);
  const efficientHitbox = starEfficientHitbox(options);
  const getBoundingBox = getStarBoundingBox(options);

  return shapeFactoryWrapper({
    name: 'star',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,

    ...shapeTextProps,
  });
};
