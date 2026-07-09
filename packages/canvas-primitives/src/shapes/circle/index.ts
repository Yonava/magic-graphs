import type { ShapeFactory } from '../../types/index.ts';
import { ellipse } from '../ellipse/index.ts';
import { CIRCLE_SCHEMA_DEFAULTS } from './defaults.ts';
import type { CircleSchema } from './types.ts';

export const circle: ShapeFactory<CircleSchema> = (options) => ({
  ...ellipse({
    ...CIRCLE_SCHEMA_DEFAULTS,
    ...options,
    radiusX: options.radius,
    radiusY: options.radius,
  }),
  name: 'circle',
});
