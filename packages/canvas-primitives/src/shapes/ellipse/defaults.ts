import { resolveDefaults } from '../../defaults/resolveDefaults.ts';
import { FILL_COLOR_DEFAULTS } from '../../defaults/schema.ts';
import type { EllipseSchema } from './types.ts';

export const ELLIPSE_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
} as const satisfies Partial<EllipseSchema>;

type EllipseDefaults = typeof ELLIPSE_SCHEMA_DEFAULTS;

export const resolveEllipseDefaults = resolveDefaults<
  EllipseSchema,
  EllipseDefaults
>(ELLIPSE_SCHEMA_DEFAULTS);
export type EllipseSchemaWithDefaults = ReturnType<
  typeof resolveEllipseDefaults
>;
