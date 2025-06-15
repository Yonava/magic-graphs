import colors from '@utils/colors';

/**
 * the theme id of the markup menu
 */
export const MARKUP_USETHEME_ID = 'markup';

/**
 * size options for nodes and edges in the markup menu
 */
export const MARKUP_SIZES = ['XS', 'SM', 'MD', 'LG', 'XL'] as const;

export const DEFAULT_MARKUP_SIZE = 'MD';

/**
 * color options for nodes and edges in the markup menu
 */
export const MARKUP_COLORS = [
  colors.BLACK,
  colors.BLUE_600,
  colors.RED_600,
  colors.GREEN_600,
  colors.YELLOW_600,
];

export const DEFAULT_MARKUP_COLOR = colors.BLACK;

/**
 * maps a size to a radius of a circle (for nodes)
 */
export const SIZE_TO_RADIUS = {
  XS: 25,
  SM: 30,
  MD: 35,
  LG: 40,
  XL: 45,
} as const;

/**
 * maps a size to a width of a line (for edges)
 */
export const SIZE_TO_WIDTH = {
  XS: 6,
  SM: 8,
  MD: 10,
  LG: 12,
  XL: 14,
} as const;
