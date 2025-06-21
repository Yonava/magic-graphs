import { BACKGROUND_COLOR_DEFAULTS } from "@shape/defaults/schema";
import type { TriangleSchema } from "./types";

export const TRIANGLE_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
} as const satisfies Partial<TriangleSchema>;