import type {
  Coordinate,
  ShapeFactory,
  Stroke,
  TextAreaNoLocation,
} from '@shape/types';
import { RECT_SCHEMA_DEFAULTS, rect } from '@shape/rect';

export type SquareSchema = {
  id?: string;
  at: Coordinate;
  size: number;
  color?: string;
  stroke?: Stroke;
  textArea?: TextAreaNoLocation;
  borderRadius?: number;
  rotation?: number;
};

export const SQUARE_SCHEMA_DEFAULTS = RECT_SCHEMA_DEFAULTS;

export const square: ShapeFactory<SquareSchema> = (options) => {
  const rectSchema = {
    ...SQUARE_SCHEMA_DEFAULTS,
    ...options,
    name: 'square',
    width: options.size,
    height: options.size,
  };
  return rect(rectSchema);
};
