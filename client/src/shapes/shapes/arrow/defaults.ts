import { LINE_SCHEMA_DEFAULTS } from "@shapes/line/defaults";
import type { ArrowSchema } from "./types";
import { getArrowHeadSize } from "@shape/helpers";

export const ARROW_SCHEMA_DEFAULTS = {
  ...LINE_SCHEMA_DEFAULTS,
  arrowHeadSize: getArrowHeadSize,
} as const satisfies Partial<ArrowSchema>;