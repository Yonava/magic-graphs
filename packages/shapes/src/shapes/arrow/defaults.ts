import { resolveDefaults } from '../../defaults/resolveDefaults';
import { LINE_SCHEMA_DEFAULTS } from '../line/defaults';

import type { ArrowSchema } from './types';

export const ARROW_SCHEMA_DEFAULTS = {
  ...LINE_SCHEMA_DEFAULTS,
} as const satisfies Partial<ArrowSchema>;

type ArrowDefaults = typeof ARROW_SCHEMA_DEFAULTS;

export const resolveArrowDefaults = resolveDefaults<ArrowSchema, ArrowDefaults>(
  ARROW_SCHEMA_DEFAULTS,
);
export type ArrowSchemaWithDefaults = ReturnType<typeof resolveArrowDefaults>;
