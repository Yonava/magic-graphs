import type { ShapeFactory } from '@shape/types';
import type { SquareSchema } from './types';
import { SQUARE_SCHEMA_DEFAULTS } from './defaults';
import { rect } from '../rect';

export const square: ShapeFactory<SquareSchema> = (options) => ({
  ...rect({
    ...SQUARE_SCHEMA_DEFAULTS,
    ...options,
    width: options.size,
    height: options.size,
  }),
  name: 'square',
});
