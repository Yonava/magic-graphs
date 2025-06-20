import { BACKGROUND_COLOR_DEFAULTS } from "@shape/defaults/schema";
import type { EllipseSchema } from "./types";

export const ELLIPSE_SCHEMA_DEFAULTS = {
  ...BACKGROUND_COLOR_DEFAULTS,
} as const satisfies Partial<EllipseSchema>;