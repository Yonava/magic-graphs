import { getStarBoundingBox, starEfficientHitbox, starHitbox } from './hitbox';
import { drawStarWithCtx } from './draw';
import type { Coordinate } from '@shape/types/utility';
import type { ShapeFactory } from '@shape/types';

export type StarSchema = {
  at: Coordinate;
  innerRadius: number;
  outerRadius: number;

  color?: string;
  rotation?: number;
  points?: number;
};

export const STAR_SCHEMA_DEFAULTS = {
  color: 'black',
  points: 5,
  rotation: 0,
} as const;

export const star: ShapeFactory<StarSchema> = (options) => {
  const drawShape = drawStarWithCtx(options);
  const shapeHitbox = starHitbox(options);
  const hitbox = shapeHitbox;
  const efficientHitbox = starEfficientHitbox(options);
  const getBoundingBox = getStarBoundingBox(options);

  return {
    name: 'star',

    draw: drawShape,
    drawShape,
    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,
  };
};
