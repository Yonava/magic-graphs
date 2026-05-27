import { resolveDefaults } from '../../defaults/resolveDefaults.ts';
import {
  FILL_COLOR_DEFAULTS,
  LINE_WIDTH_DEFAULTS,
} from '../../defaults/schema.ts';
import type { LineSchema } from './types.ts';

export const LINE_SCHEMA_DEFAULTS = {
  ...LINE_WIDTH_DEFAULTS,
  ...FILL_COLOR_DEFAULTS,
  textOffsetFromCenter: 0,
} as const satisfies Partial<LineSchema>;

type LineDefaults = typeof LINE_SCHEMA_DEFAULTS;

export const resolveLineDefaults = resolveDefaults<LineSchema, LineDefaults>(
  LINE_SCHEMA_DEFAULTS,
);
export type LineSchemaWithDefaults = ReturnType<typeof resolveLineDefaults>;
