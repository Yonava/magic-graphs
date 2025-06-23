import {
  FILL_COLOR_DEFAULTS,
  BORDER_RADIUS_DEFAULTS,
  LINE_WIDTH_DEFAULTS,
  ROTATION_DEFAULTS
} from "@shape/defaults/schema";
import type { CrossSchema } from "./types";

export const CROSS_SCHEMA_DEFAULTS = {
  ...ROTATION_DEFAULTS,
  ...FILL_COLOR_DEFAULTS,
  ...LINE_WIDTH_DEFAULTS,
  ...BORDER_RADIUS_DEFAULTS,
} as const satisfies Partial<CrossSchema>;