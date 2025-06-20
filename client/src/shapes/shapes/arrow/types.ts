import type { Shape } from "@shape/types";
import type { Coordinate } from "@shape/types/utility";
import type { LineSchema } from "@shapes/line/types";

export type ArrowSchema = LineSchema & {
  arrowHeadSize?: (width: number) => {
    arrowHeadHeight: number;
    perpLineLength: number;
  };
  arrowHeadShape?: (at: Coordinate, height: number, width: number) => Shape;
};