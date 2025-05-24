import type { Coordinate, ShapeFactory } from '@shape/types';
import { generateId } from '@utils/id';
import { getStarBoundingBox, starEfficientHitbox, starHitbox } from './hitbox';
import { drawStarWithCtx } from './draw';

export type StarSchema = {
  id?: string;
  at: Coordinate;
  color?: string;
  innerRadius: number;
  outerRadius: number;
  rotation?: number;
  points?: number;
};

export const STAR_SCHEMA_DEFAULTS = {
  color: 'black',
  points: 5,
  rotation: 0,
} as const;

/**
 * Creates a star shape
 * @throws {Error} If points < 3, innerRadius >= outerRadius, or negative radius values
 */
export const star: ShapeFactory<StarSchema> = (options) => {
  const drawShape = drawStarWithCtx(options);
  const shapeHitbox = starHitbox(options);
  const hitbox = shapeHitbox;
  const efficientHitbox = starEfficientHitbox(options);
  const getBoundingBox = getStarBoundingBox(options);

  return {
    id: options.id ?? generateId(),
    name: 'star',

    draw: drawShape,
    drawShape,
    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,
  };
};
