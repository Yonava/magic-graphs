import type { FillColor, TextArea } from '../../types/schema.ts';
import type { Coordinate } from '../../types/utility.ts';

export type ScribbleSchema = {
  type: 'draw' | 'erase';
  points: Coordinate[];
  brushWeight?: number;
} & FillColor &
  TextArea;
