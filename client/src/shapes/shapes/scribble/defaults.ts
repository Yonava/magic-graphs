import { FILL_COLOR_DEFAULTS } from "@shape/defaults/schema";
import type { ScribbleSchema } from "./types";
import { resolveDefaults } from "@shape/defaults/resolveDefaults";

export const SCRIBBLE_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
  brushWeight: 3,
} as const satisfies Partial<ScribbleSchema>;

type ScribbleDefaults = typeof SCRIBBLE_SCHEMA_DEFAULTS

export const resolveScribbleDefaults = resolveDefaults<
  ScribbleSchema,
  ScribbleDefaults
>(SCRIBBLE_SCHEMA_DEFAULTS)
export type ScribbleSchemaWithDefaults = ReturnType<typeof resolveScribbleDefaults>