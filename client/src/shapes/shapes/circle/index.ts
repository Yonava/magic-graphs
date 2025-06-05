import type { Coordinate } from '@shape/types/utility';
import type { Stroke, TextArea } from '@shape/types/schema'
import { ELLIPSE_SCHEMA_DEFAULTS, ellipse } from '../ellipse';
import type { ShapeFactory } from '@shape/types';

export type CircleSchema = {
  id?: string;

  at: Coordinate;
  radius: number;

  color?: string;
  stroke?: Stroke;
  textArea?: TextArea;
};

export const CIRCLE_SCHEMA_DEFAULTS = ELLIPSE_SCHEMA_DEFAULTS;

export const circle: ShapeFactory<CircleSchema> = (options) => ({
  ...ellipse({
    ...CIRCLE_SCHEMA_DEFAULTS,
    ...options,
    radiusX: options.radius,
    radiusY: options.radius,
  }),
  name: 'circle'
})
