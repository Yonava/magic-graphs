import type {
  AnchorPoint,
  BorderRadius,
  FillColor,
  LineWidth,
  Rotation
} from "@shape/types/schema";

export type CrossSchema = {
  size: number;
} &
  AnchorPoint &
  Rotation &
  LineWidth &
  BorderRadius &
  FillColor;