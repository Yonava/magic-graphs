import { resolveDefaults } from "@shape/defaults/resolveDefaults";
import type { ImageSchema } from "./types";
import { ROTATION_DEFAULTS } from "@shape/defaults/schema";

export const IMAGE_SCHEMA_DEFAULTS = {
  ...ROTATION_DEFAULTS,
} as const satisfies Partial<ImageSchema>;

type ImageDefaults = typeof IMAGE_SCHEMA_DEFAULTS

export const resolveImageDefaults = resolveDefaults<
  ImageSchema,
  ImageDefaults
>(IMAGE_SCHEMA_DEFAULTS)
export type ImageSchemaWithDefaults = ReturnType<typeof resolveImageDefaults>