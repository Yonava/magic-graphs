import type { Shape } from "@shape/types";
import type {
  AnchorPoint,
  FillColor,
  FillGradient,
  LineWidth,
  Rotation,
  TextArea
} from "@shape/types/schema";
import type { Coordinate } from "@shape/types/utility";

export type UTurnSchema = {
  spacing: number;
  upDistance: number;
  downDistance: number;
  arrowHeadSize?: (width: number) => {
    arrowHeadHeight: number;
    perpLineLength: number;
  };
  arrowHeadShape?: (at: Coordinate, height: number, width: number) => Shape;
} &
  AnchorPoint &
  Rotation &
  LineWidth &
  FillColor &
  TextArea &
  FillGradient;