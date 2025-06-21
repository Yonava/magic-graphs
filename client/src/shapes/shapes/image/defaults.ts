import { RECT_SCHEMA_DEFAULTS } from "../rect/defaults";
import type { ImageSchema } from "./types";

export const IMAGE_SCHEMA_DEFAULTS = {
  ...RECT_SCHEMA_DEFAULTS,
} as const satisfies Partial<ImageSchema>;