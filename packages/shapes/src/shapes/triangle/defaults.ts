import { resolveDefaults } from '../../defaults/resolveDefaults.ts';
import { FILL_COLOR_DEFAULTS } from '../../defaults/schema.ts';
import type { TriangleSchema } from './types';

export const TRIANGLE_SCHEMA_DEFAULTS = {
  ...FILL_COLOR_DEFAULTS,
} as const satisfies Partial<TriangleSchema>;

type TriangleDefaults = typeof TRIANGLE_SCHEMA_DEFAULTS;

export const resolveTriangleDefaults = resolveDefaults<
  TriangleSchema,
  TriangleDefaults
>(TRIANGLE_SCHEMA_DEFAULTS);
export type TriangleSchemaWithDefaults = ReturnType<
  typeof resolveTriangleDefaults
>;
