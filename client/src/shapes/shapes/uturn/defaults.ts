import {
  FILL_COLOR_DEFAULTS,
  LINE_WIDTH_DEFAULTS,
  ROTATION_DEFAULTS
} from "@shape/defaults/schema";
import type { UTurnSchema } from "./types";
import { getArrowHeadSize } from "@shape/helpers";
import { resolveDefaults } from "@shape/resolveDefaults";

export const UTURN_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
  ...ROTATION_DEFAULTS,
  ...LINE_WIDTH_DEFAULTS,
  arrowHeadSize: getArrowHeadSize,
} as const satisfies Partial<UTurnSchema>;

type UTurnDefaults = typeof UTURN_SCHEMA_DEFAULTS

export const resolveUTurnDefaults = resolveDefaults<
  UTurnSchema,
  UTurnDefaults
>(UTURN_SCHEMA_DEFAULTS)
export type UTurnSchemaWithDefaults = ReturnType<typeof resolveUTurnDefaults>