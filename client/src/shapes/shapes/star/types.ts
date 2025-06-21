import type { AnchorPoint, FillColor, Rotation, TextArea } from "@shape/types/schema";

export type StarSchema = {
  innerRadius: number;
  outerRadius: number;
  points?: number;
} &
  TextArea &
  AnchorPoint &
  FillColor &
  Rotation;