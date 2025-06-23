import type {
  FillColor,
  BorderRadius,
  LineWidth,
  Rotation,
} from '@shape/types/schema';

export const LINE_WIDTH_DEFAULTS = {
  lineWidth: 10,
} as const satisfies LineWidth;

export const FILL_COLOR_DEFAULTS = {
  fillColor: 'black',
} as const satisfies FillColor;

export const ROTATION_DEFAULTS = {
  rotation: 0,
} as const satisfies Rotation;

export const BORDER_RADIUS_DEFAULTS = {
  borderRadius: 0,
} as const satisfies BorderRadius;
