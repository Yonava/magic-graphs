import { RECT_SCHEMA_DEFAULTS } from "../rect/defaults";
import type { SquareSchema } from "./types";

export const SQUARE_SCHEMA_DEFAULTS = {
  ...RECT_SCHEMA_DEFAULTS,
} as const satisfies Partial<SquareSchema>;