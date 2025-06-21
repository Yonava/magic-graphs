import { ELLIPSE_SCHEMA_DEFAULTS } from "../ellipse/defaults";
import type { CircleSchema } from "./types";

export const CIRCLE_SCHEMA_DEFAULTS = {
  ...ELLIPSE_SCHEMA_DEFAULTS,
} as const satisfies Partial<CircleSchema>