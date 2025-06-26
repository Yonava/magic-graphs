import {
  FILL_COLOR_DEFAULTS,
  LINE_WIDTH_DEFAULTS,
  ROTATION_DEFAULTS
} from "@shape/defaults/schema";
import type { UTurnSchema } from "./types";
import { getArrowHeadSize } from "@shape/helpers";

export const UTURN_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
  ...ROTATION_DEFAULTS,
  ...LINE_WIDTH_DEFAULTS,
  arrowHeadSize: getArrowHeadSize,
} as const satisfies Partial<UTurnSchema>;