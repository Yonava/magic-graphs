import type {
  AnchorPoint,
  BorderRadius,
  FillColor,
  LineWidth,
  Rotation,
  TextArea
} from "@shape/types/schema";

export type CrossSchema = {
  size: number;
} &
  TextArea &
  AnchorPoint &
  Rotation &
  LineWidth &
  BorderRadius &
  FillColor;