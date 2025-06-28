import type { FillColor, TextArea } from "@shape/types/schema";
import type { Coordinate } from "@shape/types/utility";

export type ScribbleSchema = {
  type: 'draw' | 'erase';
  points: Coordinate[];
  brushWeight?: number;
} &
  FillColor &
  TextArea;