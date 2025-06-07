import {
  getStarBoundingBox,
  starEfficientHitbox,
  starHitbox,
  getStarCenterPoint,
} from './hitbox';
import { drawStarWithCtx } from './draw';
import type { ShapeFactory } from '@shape/types';
import type { AnchorPoint, FillColor, Rotation } from '@shape/types/schema';
import {
  BACKGROUND_COLOR_DEFAULTS,
  ROTATION_DEFAULTS,
} from '@shape/defaults/schema';

export type StarSchema = AnchorPoint &
  FillColor &
  Rotation & {
    innerRadius: number;
    outerRadius: number;
    points?: number;
  };

export const STAR_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
  ...ROTATION_DEFAULTS,
  points: 5,
} as const satisfies Partial<StarSchema>;

export const star: ShapeFactory<StarSchema> = (options) => {
  const draw = drawStarWithCtx(options);
  const drawShape = drawStarWithCtx(options);

  const shapeHitbox = starHitbox(options);
  const hitbox = shapeHitbox;
  const efficientHitbox = starEfficientHitbox(options);
  const getBoundingBox = getStarBoundingBox(options);
  const getCenterPoint = getStarCenterPoint(options);

  return {
    name: 'star',

    draw,
    drawShape,

    hitbox,
    shapeHitbox,
    efficientHitbox,
    getBoundingBox,
    getCenterPoint,
  };
};
