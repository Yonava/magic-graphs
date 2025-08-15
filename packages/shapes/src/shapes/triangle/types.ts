import type {
  FillColor,
  FillGradient,
  Stroke,
  TextArea,
} from '../../types/schema';
import type { Coordinate } from '../../types/utility';

export type TriangleSchema = {
  pointA: Coordinate;
  pointB: Coordinate;
  pointC: Coordinate;
} & FillColor &
  Stroke &
  TextArea &
  FillGradient;
