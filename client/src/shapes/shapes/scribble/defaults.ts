import { BACKGROUND_COLOR_DEFAULTS } from "@shape/defaults/schema";
import type { ScribbleSchema } from "./types";

export const SCRIBBLE_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
  brushWeight: 3,
} as const satisfies Partial<ScribbleSchema>;