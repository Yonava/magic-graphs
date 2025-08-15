import { resolveDefaults } from '../../defaults/resolveDefaults';
import { FILL_COLOR_DEFAULTS, ROTATION_DEFAULTS } from '../../defaults/schema';

import type { StarSchema } from './types';

export const STAR_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
  ...ROTATION_DEFAULTS,
  points: 5,
} as const satisfies Partial<StarSchema>;

type StarDefaults = typeof STAR_SCHEMA_DEFAULTS;

export const resolveStarDefaults = resolveDefaults<StarSchema, StarDefaults>(
  STAR_SCHEMA_DEFAULTS,
);
export type StarSchemaWithDefaults = ReturnType<typeof resolveStarDefaults>;
