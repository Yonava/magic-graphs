import { resolveDefaults } from '../../defaults/resolveDefaults';
import { FILL_COLOR_DEFAULTS } from '../../defaults/schema';

import type { ScribbleSchema } from './types';

export const SCRIBBLE_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
  brushWeight: 3,
} as const satisfies Partial<ScribbleSchema>;

type ScribbleDefaults = typeof SCRIBBLE_SCHEMA_DEFAULTS;

export const resolveScribbleDefaults = resolveDefaults<
  ScribbleSchema,
  ScribbleDefaults
>(SCRIBBLE_SCHEMA_DEFAULTS);
export type ScribbleSchemaWithDefaults = ReturnType<
  typeof resolveScribbleDefaults
>;
