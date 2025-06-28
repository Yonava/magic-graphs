import {
  FILL_COLOR_DEFAULTS,
  BORDER_RADIUS_DEFAULTS,
  ROTATION_DEFAULTS
} from "@shape/defaults/schema";
import type { RectSchema } from "./types";
import { resolveDefaults } from "@shape/defaults/resolveDefaults";

export const RECT_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
  ...BORDER_RADIUS_DEFAULTS,
  ...ROTATION_DEFAULTS,
} as const satisfies Partial<RectSchema>;

type RectDefaults = typeof RECT_SCHEMA_DEFAULTS

export const resolveRectDefaults = resolveDefaults<
  RectSchema,
  RectDefaults
>(RECT_SCHEMA_DEFAULTS)
export type RectSchemaWithDefaults = ReturnType<typeof resolveRectDefaults>