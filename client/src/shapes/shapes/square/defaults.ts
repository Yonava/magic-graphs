import { resolveDefaults } from "@shape/defaults/resolveDefaults";
import { RECT_SCHEMA_DEFAULTS } from "../rect/defaults";
import type { SquareSchema } from "./types";

export const SQUARE_SCHEMA_DEFAULTS = {
  ...RECT_SCHEMA_DEFAULTS,
} as const satisfies Partial<SquareSchema>;

type SquareDefaults = typeof SQUARE_SCHEMA_DEFAULTS;

export const resolveSquareDefaults = resolveDefaults<
  SquareSchema,
  SquareDefaults
>(SQUARE_SCHEMA_DEFAULTS)
export type SquareSchemaWithDefaults = ReturnType<typeof resolveSquareDefaults>