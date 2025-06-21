import type {
  AnchorPoint,
  BorderRadius,
  FillColor,
  Rotation,
  Stroke,
  TextArea
} from "@shape/types/schema";

export type RectSchema = {
  width: number;
  height: number;
} &
  AnchorPoint &
  FillColor &
  Stroke &
  TextArea &
  BorderRadius &
  Rotation;