import { FILL_COLOR_DEFAULTS } from "@shape/defaults/schema";
import type { EllipseSchema } from "./types";
import { resolveDefaults } from "@shape/defaults/resolveDefaults";

export const ELLIPSE_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
} as const satisfies Partial<EllipseSchema>;

type EllipseDefaults = typeof ELLIPSE_SCHEMA_DEFAULTS

export const resolveEllipseDefaults = resolveDefaults<
  EllipseSchema,
  EllipseDefaults
>(ELLIPSE_SCHEMA_DEFAULTS)
export type EllipseSchemaWithDefaults = ReturnType<typeof resolveEllipseDefaults>