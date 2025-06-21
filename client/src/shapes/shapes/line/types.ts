import type { FillColor, FillGradient, LineWidth, TextArea } from "@shape/types/schema";
import type { Coordinate, DashPattern } from "@shape/types/utility";

export type LineSchema = {
  start: Coordinate;
  end: Coordinate;
  /**
   * offsetFromCenter is used to position text. By default, text is centered on the line.
   * If -10, text will be on the line but 10 units towards the start.
   * If 10, text will be on the line but 10 units away from the start.
   */
  textOffsetFromCenter?: number;
  dash?: DashPattern;
} &
  LineWidth &
  TextArea &
  FillColor &
  FillGradient;