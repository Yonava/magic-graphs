import { EverySchemaPropName } from '../../types/index.ts';

export const AUTO_ANIMATE_DURATION_MS = 500;
/**
 * properties supported by the auto animate feature.
 *
 * ⚠️ **only properties listed here will be animated with `useAutoAnimate`**
 */
export const AUTO_ANIMATED_PROPERTIES = new Set<EverySchemaPropName>([
  'at',
  'start',
  'end',
  'lineWidth',
  'radius',
  'fillColor',
]);
