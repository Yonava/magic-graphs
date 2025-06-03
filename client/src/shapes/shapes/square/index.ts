import type {
  Coordinate,
  ShapeFactory,
  Stroke,
  TextAreaNoLocation,
} from '@shape/types';
import { RECT_SCHEMA_DEFAULTS, rect } from '@shape/shapes/rect';

export type SquareSchema = {
  at: Coordinate;
  size: number;
  color?: string;
  stroke?: Stroke;
  textArea?: TextAreaNoLocation;
  borderRadius?: number | number[];
  rotation?: number;
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
});
