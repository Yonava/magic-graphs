import type { AnchorPoint, FillColor, Rotation } from "@shape/types/schema";

export type StarSchema = {
  innerRadius: number;
  outerRadius: number;
  points?: number;
} &
  AnchorPoint &
  FillColor &
  Rotation;