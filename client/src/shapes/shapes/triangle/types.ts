import type { FillColor, FillGradient, Stroke, TextArea } from "@shape/types/schema";
import type { Coordinate } from "@shape/types/utility";


export type TriangleSchema = {
  pointA: Coordinate;
  pointB: Coordinate;
  pointC: Coordinate;
} &
  FillColor &
  Stroke &
  TextArea &
  FillGradient;