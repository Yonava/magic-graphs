import { BACKGROUND_COLOR_DEFAULTS, LINE_WIDTH_DEFAULTS } from "@shape/defaults/schema";
import type { LineSchema } from "./types";

export const LINE_SCHEMA_DEFAULTS = {
  ...LINE_WIDTH_DEFAULTS,
  ...BACKGROUND_COLOR_DEFAULTS,
  textOffsetFromCenter: 0,
} as const satisfies Partial<LineSchema>;