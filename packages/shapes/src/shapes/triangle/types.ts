import type {
  FillColor,
  FillGradient,
  Stroke,
  TextArea,
} from '../../types/schema.ts';
import type { Coordinate } from '../../types/utility.ts';

export type TriangleSchema = {
  pointA: Coordinate;
  pointB: Coordinate;
  pointC: Coordinate;
} & FillColor &
  Stroke &
  TextArea &
  FillGradient;
