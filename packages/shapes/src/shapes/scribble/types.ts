import type { FillColor, TextArea } from '../../types/schema';
import type { Coordinate } from '../../types/utility';

export type ScribbleSchema = {
  type: 'draw' | 'erase';
  points: Coordinate[];
  brushWeight?: number;
} & FillColor &
  TextArea;
