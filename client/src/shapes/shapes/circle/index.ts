import { ELLIPSE_SCHEMA_DEFAULTS, ellipse, type EllipseSchema } from '../ellipse';
import type { ShapeFactory } from '@shape/types';

export type CircleSchema = Omit<EllipseSchema, 'radiusX' | 'radiusY'> & {
  radius: number
}

export const CIRCLE_SCHEMA_DEFAULTS = {
  ...ELLIPSE_SCHEMA_DEFAULTS,
} as const satisfies Partial<CircleSchema>

export const circle: ShapeFactory<CircleSchema> = (options) => ({
  ...ellipse({
    ...CIRCLE_SCHEMA_DEFAULTS,
    ...options,
    radiusX: options.radius,
    radiusY: options.radius,
  }),
  name: 'circle'
})
