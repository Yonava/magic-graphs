import { RECT_SCHEMA_DEFAULTS, rect, type RectSchema } from '@shape/shapes/rect';
import type { ShapeFactory } from '@shape/types';

export type SquareSchema = Omit<RectSchema, 'width' | 'height'> & {
  size: number;
};

export const SQUARE_SCHEMA_DEFAULTS = RECT_SCHEMA_DEFAULTS;

export const square: ShapeFactory<SquareSchema> = (options) => ({
  ...rect({
    ...SQUARE_SCHEMA_DEFAULTS,
    ...options,
    width: options.size,
    height: options.size,
  }),
  name: 'square',
})
