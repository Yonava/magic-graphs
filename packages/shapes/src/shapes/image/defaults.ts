import { resolveDefaults } from '../../defaults/resolveDefaults.ts';
import { ROTATION_DEFAULTS } from '../../defaults/schema.ts';
import type { ImageSchema } from './types.ts';

export const IMAGE_SCHEMA_DEFAULTS = {
  ...ROTATION_DEFAULTS,
} as const satisfies Partial<ImageSchema>;

type ImageDefaults = typeof IMAGE_SCHEMA_DEFAULTS;

export const resolveImageDefaults = resolveDefaults<ImageSchema, ImageDefaults>(
  IMAGE_SCHEMA_DEFAULTS,
);
export type ImageSchemaWithDefaults = ReturnType<typeof resolveImageDefaults>;
