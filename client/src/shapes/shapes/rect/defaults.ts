import {
  FILL_COLOR_DEFAULTS,
  BORDER_RADIUS_DEFAULTS,
  ROTATION_DEFAULTS
} from "@shape/defaults/schema";
import type { RectSchema } from "./types";

export const RECT_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
  ...BORDER_RADIUS_DEFAULTS,
  ...ROTATION_DEFAULTS,
} as const satisfies Partial<RectSchema>;