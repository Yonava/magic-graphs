import type { ShapeFactory } from '../../types/index.ts';
import { rect } from '../rect/index.ts';
import { SQUARE_SCHEMA_DEFAULTS } from './defaults.ts';
import type { SquareSchema } from './types.ts';

export const square: ShapeFactory<SquareSchema> = (options) => ({
  ...rect({
    ...SQUARE_SCHEMA_DEFAULTS,
    ...options,
    width: options.size,
    height: options.size,
  }),
  name: 'square',
});
