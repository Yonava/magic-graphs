import type { Shortcut } from './shortcut/types.ts';

export const PRODUCT_SHORTCUTS = {
  Fullscreen: { binding: 'f' },
  Help: { binding: 'h' },
  'Pause/Play Simulation': { binding: 'space' },
  'Simulation Step Forward': { binding: 'arrowright' },
  'Simulation Step Backward': { binding: 'arrowleft' },
  'Exit Simulation': { binding: 'esc' },
} as const satisfies Record<string, Omit<Shortcut, 'trigger'>>;
