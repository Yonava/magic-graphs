import { ellipse } from '../ellipse';
import type { ShapeFactory } from '@shape/types';
import { CIRCLE_SCHEMA_DEFAULTS } from './defaults';
import type { CircleSchema } from './types';

export const circle: ShapeFactory<CircleSchema> = (options) => ({
  ...ellipse({
    ...CIRCLE_SCHEMA_DEFAULTS,
    ...options,
    radiusX: options.radius,
    radiusY: options.radius,
  }),
  name: 'circle'
})
