import type { AnchorPoint, FillColor, Stroke, TextArea } from "@shape/types/schema";

export type EllipseSchema = {
  radiusX: number;
  radiusY: number;
} &
  AnchorPoint &
  FillColor &
  Stroke &
  TextArea;