import type {
  Coordinate,
  Stroke,
  TextAreaNoLocation,
  ShapeFactory,
} from '@shape/types';
import { ELLIPSE_SCHEMA_DEFAULTS, ellipse } from '@shape/ellipse';

export type CircleSchema = {
  id?: string;
  at: Coordinate;
  radius: number;
  color?: string;
  stroke?: Stroke;
  textArea?: TextAreaNoLocation;
};

export const CIRCLE_SCHEMA_DEFAULTS = ELLIPSE_SCHEMA_DEFAULTS;

export const circle: ShapeFactory<CircleSchema> = (options) => {
  const ellipseSchema = {
    ...CIRCLE_SCHEMA_DEFAULTS,
    ...options,
    name: 'circle',
    radiusX: options.radius,
    radiusY: options.radius,
  };
  return ellipse(ellipseSchema);
};
