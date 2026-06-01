import type { SchemaItem } from '../../types.ts';

export type FocusGraphSettings = {
  /**
   * if false, no {@link SchemaItem | item} on the graph can be focused
   * @default true
   */
  focusable: boolean;
};

export const DEFAULT_FOCUS_SETTINGS: FocusGraphSettings = {
  focusable: true,
};
