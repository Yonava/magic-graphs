import type {
  AnchorPoint,
  FillColor,
  FillGradient,
  LineWidth,
  Rotation,
  TextArea
} from "@shape/types/schema";

export type UTurnSchema = {
  spacing: number;
  upDistance: number;
  downDistance: number;
} &
  AnchorPoint &
  Rotation &
  LineWidth &
  FillColor &
  TextArea &
  FillGradient;