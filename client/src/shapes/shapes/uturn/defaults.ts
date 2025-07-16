import {
  FILL_COLOR_DEFAULTS,
  LINE_WIDTH_DEFAULTS,
  ROTATION_DEFAULTS
} from "@shape/defaults/schema";
import type { UTurnSchema } from "./types";
import { resolveDefaults } from "@shape/defaults/resolveDefaults";

export const UTURN_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
  ...ROTATION_DEFAULTS,
  ...LINE_WIDTH_DEFAULTS,
} as const satisfies Partial<UTurnSchema>;

type UTurnDefaults = typeof UTURN_SCHEMA_DEFAULTS

export const resolveUTurnDefaults = resolveDefaults<
  UTurnSchema,
  UTurnDefaults
>(UTURN_SCHEMA_DEFAULTS)
export type UTurnSchemaWithDefaults = ReturnType<typeof resolveUTurnDefaults>