import { resolveDefaults } from "@shape/defaults/resolveDefaults";
import { ELLIPSE_SCHEMA_DEFAULTS } from "../ellipse/defaults";
import type { CircleSchema } from "./types";

export const CIRCLE_SCHEMA_DEFAULTS = {
  ...ELLIPSE_SCHEMA_DEFAULTS,
} as const satisfies Partial<CircleSchema>

type CircleDefaults = typeof CIRCLE_SCHEMA_DEFAULTS;

export const resolveCircleDefaults = resolveDefaults<
  CircleSchema,
  CircleDefaults
>(CIRCLE_SCHEMA_DEFAULTS);

export type CircleSchemaWithDefaults = ReturnType<typeof resolveCircleDefaults>