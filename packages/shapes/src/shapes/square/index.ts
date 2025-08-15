import type { ShapeFactory } from '../../types';

import { rect } from '../rect';
import { SQUARE_SCHEMA_DEFAULTS } from './defaults';
import type { SquareSchema } from './types';

export const square: ShapeFactory<SquareSchema> = (options) => ({
  ...rect({
    ...SQUARE_SCHEMA_DEFAULTS,
    ...options,
    width: options.size,
    height: options.size,
  }),
  name: 'square',
});
