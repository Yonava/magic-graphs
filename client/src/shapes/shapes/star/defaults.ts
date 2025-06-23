import { FILL_COLOR_DEFAULTS, ROTATION_DEFAULTS } from "@shape/defaults/schema";
import type { StarSchema } from "./types";

export const STAR_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
  ...ROTATION_DEFAULTS,
  points: 5,
} as const satisfies Partial<StarSchema>;