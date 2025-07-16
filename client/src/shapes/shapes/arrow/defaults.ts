import { LINE_SCHEMA_DEFAULTS } from "@shapes/line/defaults";
import type { ArrowSchema } from "./types";
import { resolveDefaults } from "@shape/defaults/resolveDefaults";

export const ARROW_SCHEMA_DEFAULTS = {
  ...LINE_SCHEMA_DEFAULTS,
} as const satisfies Partial<ArrowSchema>;

type ArrowDefaults = typeof ARROW_SCHEMA_DEFAULTS

export const resolveArrowDefaults = resolveDefaults<ArrowSchema, ArrowDefaults>(ARROW_SCHEMA_DEFAULTS)
export type ArrowSchemaWithDefaults = ReturnType<typeof resolveArrowDefaults>