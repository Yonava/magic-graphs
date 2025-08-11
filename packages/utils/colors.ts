/**
 * alias used for all types that represent a color value
 */
export type Color = string;

/**
 * check if a color is a standard hex color - #xxxxxx
 */
export const isHexStandard = (color: Color) => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

/**
 * check if a color is a hex color with an alpha channel - #xxxxxxxx
 */
export const isHexAlpha = (color: Color) => {
  return /^#[0-9A-F]{8}$/i.test(color);
};

/**
 * check if a color is a hex color - #xxxxxx or #xxxxxxxx
 */
export const isHex = (color: Color) => {
  return isHexStandard(color) || isHexAlpha(color);
};

/**
 * check if a color is a standard rgb color - rgb(xxx, xxx, xxx)
 */
export const isRgbStandard = (color: Color) => {
  return /^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/i.test(color);
};

/**
 * check if a color is an rgb color - rgba(xxx, xxx, xxx, xxx)
 */
export const isRgbAlpha = (color: Color) => {
  return /^rgba\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}\)$/i.test(color);
};

/**
 * check if a color is an rgb color - rgb(xxx, xxx, xxx) or rgba(xxx, xxx, xxx, xxx)
 */
export const isRgb = (color: Color) => {
  return isRgbStandard(color) || isRgbAlpha(color);
};

/**
 * check if a color is an hsl color - hsl(xxx, xxx%, xxx%)
 */
export const isHslStandard = (color: Color) => {
  return /^hsl\(\d{1,3},\d{1,3}%,\d{1,3}%\)$/i.test(color);
};

/**
 * check if a color is an hsl color - hsla(xxx, xxx%, xxx%, xxx)
 */
export const isHslAlpha = (color: Color) => {
  return /^hsla\(\d{1,3},\d{1,3}%,\d{1,3}%,\d{1,3}\)$/i.test(color);
};

/**
 * check if a color is an hsl color - hsl(xxx, xxx%, xxx%) or hsla(xxx, xxx%, xxx%, xxx)
 */
export const isHsl = (color: Color) => {
  return isHslStandard(color) || isHslAlpha(color);
};

/**
 * check if a color is a valid color - hex, rgb, or hsl including their alpha channel variants
 */
export const isColor = (color: Color) => {
  return isHex(color) || isRgb(color) || isHsl(color);
};

/**
 * adjust a color by a certain amount - the hex color hex format
 *
 * @param color the hexadecimal color to darken
 * @param amount the amount to darken the color by
 * @returns the darkened color
 * @example adjustHex('#ff0000', 20) // lightens the color by 20 (out of 255)
 * @example adjustHex('#ff0000', -20) // darkens the color by 20 (out of 255)
 */
export const adjustHex = (color: Color, amount: number): Color => {
  const colorInt = parseInt(color.slice(1), 16);

  const rgb = [
    (colorInt >> 16) + amount,
    ((colorInt >> 8) & 0x00ff) + amount,
    (colorInt & 0x0000ff) + amount,
  ];

  const colorStr = rgb
    .map((v) => Math.min(Math.max(v, 0), 255).toString(16).padStart(2, '0'))
    .join('');

  return `#${colorStr}`;
};

export const darkenHex = (color: Color, amount: number): Color => {
  return adjustHex(color, -amount);
};

export const lightenHex = (color: Color, amount: number): Color => {
  return adjustHex(color, amount);
};

/**
 * calculates the relative luminance of a HEX color
 *
 * the relative luminance is computed using the WCAG formula:
 * L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 * where R, G, B are linearized RGB values (gamma corrected).
 *
 * @param {string} hex - the HEX color string
 * @returns {number} the relative luminance of the color, a number between 0 (black) and 1 (white).
 *
 * @throws an error if the HEX string is invalid
 *
 * @example getLuminance('#ff0000'); // 0.2126
 */
export const getLuminance = (hex: Color) => {
  if (!isHex(hex)) {
    throw new Error('invalid HEX color');
  }

  const cleanHex = hex.length === 6 ? hex.slice(1) : hex.slice(1, 7);
  const bigint = parseInt(cleanHex, 16);
  const rgb = [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];

  const luminance = (channel: number) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  return (
    0.2126 * luminance(rgb[0]) +
    0.7152 * luminance(rgb[1]) +
    0.0722 * luminance(rgb[2])
  );
};

/**
 * all tailwind gray colors
 */
export const GRAY_50 = '#f9fafb';
export const GRAY_100 = '#f3f4f6';
export const GRAY_200 = '#e5e7eb';
export const GRAY_300 = '#d1d5db';
export const GRAY_400 = '#9ca3af';
export const GRAY_500 = '#6b7280';
export const GRAY_600 = '#4b5563';
export const GRAY_700 = '#374151';
export const GRAY_800 = '#1f2937';
export const GRAY_900 = '#111827';

/**
 * all tailwind red colors
 */
export const RED_50 = '#fef2f2';
export const RED_100 = '#fee2e2';
export const RED_200 = '#fecaca';
export const RED_300 = '#fca5a5';
export const RED_400 = '#f87171';
export const RED_500 = '#ef4444';
export const RED_600 = '#dc2626';
export const RED_700 = '#b91c1c';
export const RED_800 = '#991b1b';
export const RED_900 = '#7f1d1d';

/**
 * all tailwind orange colors
 */
export const ORANGE_50 = '#fff7ed';
export const ORANGE_100 = '#ffedd5';
export const ORANGE_200 = '#fed7aa';
export const ORANGE_300 = '#fdba74';
export const ORANGE_400 = '#fb923c';
export const ORANGE_500 = '#f97316';
export const ORANGE_600 = '#ea580c';
export const ORANGE_700 = '#c2410c';
export const ORANGE_800 = '#9a3412';
export const ORANGE_900 = '#7c2d12';

/**
 * all tailwind amber colors
 */
export const AMBER_50 = '#fffbeb';
export const AMBER_100 = '#fef3c7';
export const AMBER_200 = '#fde68a';
export const AMBER_300 = '#fcd34d';
export const AMBER_400 = '#fbbf24';
export const AMBER_500 = '#f59e0b';
export const AMBER_600 = '#d97706';
export const AMBER_700 = '#b45309';
export const AMBER_800 = '#92400e';
export const AMBER_900 = '#78350f';

/**
 * all tailwind yellow colors
 */
export const YELLOW_50 = '#fefce8';
export const YELLOW_100 = '#fef9c3';
export const YELLOW_200 = '#fef08a';
export const YELLOW_300 = '#fde047';
export const YELLOW_400 = '#facc15';
export const YELLOW_500 = '#eab308';
export const YELLOW_600 = '#ca8a04';
export const YELLOW_700 = '#a16207';
export const YELLOW_800 = '#854d0e';
export const YELLOW_900 = '#713f12';

/**
 * all tailwind lime colors
 */
export const LIME_50 = '#f7fee7';
export const LIME_100 = '#ecfccb';
export const LIME_200 = '#d9f99d';
export const LIME_300 = '#bef264';
export const LIME_400 = '#a3e635';
export const LIME_500 = '#84cc16';
export const LIME_600 = '#65a30d';
export const LIME_700 = '#4d7c0f';
export const LIME_800 = '#3f6212';
export const LIME_900 = '#365314';

/**
 * all tailwind green colors
 */
export const GREEN_50 = '#f0fdf4';
export const GREEN_100 = '#dcfce7';
export const GREEN_200 = '#bbf7d0';
export const GREEN_300 = '#86efac';
export const GREEN_400 = '#4ade80';
export const GREEN_500 = '#22c55e';
export const GREEN_600 = '#16a34a';
export const GREEN_700 = '#15803d';
export const GREEN_800 = '#166534';
export const GREEN_900 = '#14532d';

/**
 * all tailwind emerald colors
 */
export const EMERALD_50 = '#ecfdf5';
export const EMERALD_100 = '#d1fae5';
export const EMERALD_200 = '#a7f3d0';
export const EMERALD_300 = '#6ee7b7';
export const EMERALD_400 = '#34d399';
export const EMERALD_500 = '#10b981';
export const EMERALD_600 = '#059669';
export const EMERALD_700 = '#047857';
export const EMERALD_800 = '#065f46';
export const EMERALD_900 = '#064e3b';

/**
 * all tailwind teal colors
 */
export const TEAL_50 = '#f0fdfa';
export const TEAL_100 = '#ccfbf1';
export const TEAL_200 = '#99f6e4';
export const TEAL_300 = '#5eead4';
export const TEAL_400 = '#2dd4bf';
export const TEAL_500 = '#14b8a6';
export const TEAL_600 = '#0d9488';
export const TEAL_700 = '#0f766e';
export const TEAL_800 = '#115e59';
export const TEAL_900 = '#134e4a';

/**
 * all tailwind cyan colors
 */
export const CYAN_50 = '#ecfeff';
export const CYAN_100 = '#cffafe';
export const CYAN_200 = '#a5f3fc';
export const CYAN_300 = '#67e8f9';
export const CYAN_400 = '#22d3ee';
export const CYAN_500 = '#06b6d4';
export const CYAN_600 = '#0891b2';
export const CYAN_700 = '#0e7490';
export const CYAN_800 = '#155e75';
export const CYAN_900 = '#164e63';

/**
 * all tailwind sky colors
 */
export const SKY_50 = '#f0f9ff';
export const SKY_100 = '#e0f2fe';
export const SKY_200 = '#bae6fd';
export const SKY_300 = '#7dd3fc';
export const SKY_400 = '#38bdf8';
export const SKY_500 = '#0ea5e9';
export const SKY_600 = '#0284c7';
export const SKY_700 = '#0369a1';
export const SKY_800 = '#075985';
export const SKY_900 = '#0c4a6e';

/**
 * all tailwind blue colors
 */
export const BLUE_50 = '#eff6ff';
export const BLUE_100 = '#dbeafe';
export const BLUE_200 = '#bfdbfe';
export const BLUE_300 = '#93c5fd';
export const BLUE_400 = '#60a5fa';
export const BLUE_500 = '#3b82f6';
export const BLUE_600 = '#2563eb';
export const BLUE_700 = '#1d4ed8';
export const BLUE_800 = '#1e40af';
export const BLUE_900 = '#1e3a8a';

/**
 * all tailwind indigo colors
 */
export const INDIGO_50 = '#eef2ff';
export const INDIGO_100 = '#e0e7ff';
export const INDIGO_200 = '#c7d2fe';
export const INDIGO_300 = '#a5b4fc';
export const INDIGO_400 = '#818cf8';
export const INDIGO_500 = '#6366f1';
export const INDIGO_600 = '#4f46e5';
export const INDIGO_700 = '#4338ca';
export const INDIGO_800 = '#3730a3';
export const INDIGO_900 = '#312e81';

/**
 * all tailwind violet colors,
 */
export const VIOLET_50 = '#f5f3ff';
export const VIOLET_100 = '#ede9fe';
export const VIOLET_200 = '#ddd6fe';
export const VIOLET_300 = '#c4b5fd';
export const VIOLET_400 = '#a78bfa';
export const VIOLET_500 = '#8b5cf6';
export const VIOLET_600 = '#7c3aed';
export const VIOLET_700 = '#6d28d9';
export const VIOLET_800 = '#5b21b6';
export const VIOLET_900 = '#4c1d95';

/**
 * all tailwind purple colors
 */
export const PURPLE_50 = '#faf5ff';
export const PURPLE_100 = '#f3e8ff';
export const PURPLE_200 = '#e9d5ff';
export const PURPLE_300 = '#d8b4fe';
export const PURPLE_400 = '#c084fc';
export const PURPLE_500 = '#a855f7';
export const PURPLE_600 = '#9333ea';
export const PURPLE_700 = '#7e22ce';
export const PURPLE_800 = '#6b21a8';
export const PURPLE_900 = '#581c87';

/**
 * all tailwind fuchsia colors
 */
export const FUCHSIA_50 = '#fdf4ff';
export const FUCHSIA_100 = '#fae8ff';
export const FUCHSIA_200 = '#f5d0fe';
export const FUCHSIA_300 = '#f0abfc';
export const FUCHSIA_400 = '#e879f9';
export const FUCHSIA_500 = '#d946ef';
export const FUCHSIA_600 = '#c026d3';
export const FUCHSIA_700 = '#a21caf';
export const FUCHSIA_800 = '#86198f';
export const FUCHSIA_900 = '#701a75';

/**
 * all tailwind pink colors
 */
export const PINK_50 = '#fdf2f8';
export const PINK_100 = '#fce7f3';
export const PINK_200 = '#fbcfe8';
export const PINK_300 = '#f9a8d4';
export const PINK_400 = '#f472b6';
export const PINK_500 = '#ec4899';
export const PINK_600 = '#db2777';
export const PINK_700 = '#be185d';
export const PINK_800 = '#9d174d';
export const PINK_900 = '#831843';

/**
 * all tailwind rose colors
 */
export const ROSE_50 = '#fff1f2';
export const ROSE_100 = '#ffe4e6';
export const ROSE_200 = '#fecdd3';
export const ROSE_300 = '#fda4af';
export const ROSE_400 = '#fb7185';
export const ROSE_500 = '#f43f5e';
export const ROSE_600 = '#e11d48';
export const ROSE_700 = '#be123c';
export const ROSE_800 = '#9f1239';
export const ROSE_900 = '#881337';

/**
 * all tailwind stone colors
 */
export const STONE_50 = '#f5f7fa';
export const STONE_100 = '#e4e7eb';
export const STONE_200 = '#cbd2d9';
export const STONE_300 = '#9fa6b2';
export const STONE_400 = '#6b7280';
export const STONE_500 = '#4b5563';
export const STONE_600 = '#374151';
export const STONE_700 = '#252f3f';
export const STONE_800 = '#161e2e';
export const STONE_900 = '#0d131e';

/**
 * all tailwind neutral colors
 */
export const NEUTRAL_50 = '#f9fafb';
export const NEUTRAL_100 = '#f4f5f7';
export const NEUTRAL_200 = '#e5e7eb';
export const NEUTRAL_300 = '#d2d6dc';
export const NEUTRAL_400 = '#9fa6b2';
export const NEUTRAL_500 = '#6b7280';
export const NEUTRAL_600 = '#4b5563';
export const NEUTRAL_700 = '#374151';
export const NEUTRAL_800 = '#252f3f';
export const NEUTRAL_900 = '#161e2e';

/**
 * all tailwind zinc colors
 */
export const ZINC_50 = '#f9fafb';
export const ZINC_100 = '#f4f5f7';
export const ZINC_200 = '#e5e7eb';
export const ZINC_300 = '#d2d6dc';
export const ZINC_400 = '#9fa6b2';
export const ZINC_500 = '#6b7280';
export const ZINC_600 = '#4b5563';
export const ZINC_700 = '#374151';
export const ZINC_800 = '#252f3f';
export const ZINC_900 = '#161e2e';

/**
 * all tailwind slate colors
 */
export const SLATE_50 = '#f4f5f7';
export const SLATE_100 = '#e5e7eb';
export const SLATE_200 = '#d2d6dc';
export const SLATE_300 = '#9fa6b2';
export const SLATE_400 = '#6b7280';
export const SLATE_500 = '#4b5563';
export const SLATE_600 = '#374151';
export const SLATE_700 = '#252f3f';
export const SLATE_800 = '#161e2e';
export const SLATE_900 = '#0d131e';

export const WHITE = '#ffffff';
export const BLACK = '#000000';
export const TRANSPARENT = '#00000000';

/**
 * tailwinds 500 level color palette
 */
export const TAILWIND_500_COLORS = {
  RED: RED_500,
  ORANGE: ORANGE_500,
  AMBER: AMBER_500,
  YELLOW: YELLOW_500,
  LIME: LIME_500,
  GREEN: GREEN_500,
  EMERALD: EMERALD_500,
  TEAL: TEAL_500,
  CYAN: CYAN_500,
  SKY: SKY_500,
  BLUE: BLUE_500,
  INDIGO: INDIGO_500,
  VIOLET: VIOLET_500,
  PURPLE: PURPLE_500,
  FUCHSIA: FUCHSIA_500,
  PINK: PINK_500,
  ROSE: ROSE_500,
  STONE: STONE_500,
  NEUTRAL: NEUTRAL_500,
  ZINC: ZINC_500,
  GRAY: GRAY_500,
  SLATE: SLATE_500,
} as const;

/**
 * every color in one enum
 */
export default {
  WHITE,
  BLACK,
  TRANSPARENT,

  GRAY_50,
  GRAY_100,
  GRAY_200,
  GRAY_300,
  GRAY_400,
  GRAY_500,
  GRAY_600,
  GRAY_700,
  GRAY_800,
  GRAY_900,

  RED_50,
  RED_100,
  RED_200,
  RED_300,
  RED_400,
  RED_500,
  RED_600,
  RED_700,
  RED_800,
  RED_900,

  ORANGE_50,
  ORANGE_100,
  ORANGE_200,
  ORANGE_300,
  ORANGE_400,
  ORANGE_500,
  ORANGE_600,
  ORANGE_700,
  ORANGE_800,
  ORANGE_900,

  AMBER_50,
  AMBER_100,
  AMBER_200,
  AMBER_300,
  AMBER_400,
  AMBER_500,
  AMBER_600,
  AMBER_700,
  AMBER_800,
  AMBER_900,

  YELLOW_50,
  YELLOW_100,
  YELLOW_200,
  YELLOW_300,
  YELLOW_400,
  YELLOW_500,
  YELLOW_600,
  YELLOW_700,
  YELLOW_800,
  YELLOW_900,

  LIME_50,
  LIME_100,
  LIME_200,
  LIME_300,
  LIME_400,
  LIME_500,
  LIME_600,
  LIME_700,
  LIME_800,
  LIME_900,

  GREEN_50,
  GREEN_100,
  GREEN_200,
  GREEN_300,
  GREEN_400,
  GREEN_500,
  GREEN_600,
  GREEN_700,
  GREEN_800,
  GREEN_900,

  EMERALD_50,
  EMERALD_100,
  EMERALD_200,
  EMERALD_300,
  EMERALD_400,
  EMERALD_500,
  EMERALD_600,
  EMERALD_700,
  EMERALD_800,
  EMERALD_900,

  TEAL_50,
  TEAL_100,
  TEAL_200,
  TEAL_300,
  TEAL_400,
  TEAL_500,
  TEAL_600,
  TEAL_700,
  TEAL_800,
  TEAL_900,

  CYAN_50,
  CYAN_100,
  CYAN_200,
  CYAN_300,
  CYAN_400,
  CYAN_500,
  CYAN_600,
  CYAN_700,
  CYAN_800,
  CYAN_900,

  SKY_50,
  SKY_100,
  SKY_200,
  SKY_300,
  SKY_400,
  SKY_500,
  SKY_600,
  SKY_700,
  SKY_800,
  SKY_900,

  BLUE_50,
  BLUE_100,
  BLUE_200,
  BLUE_300,
  BLUE_400,
  BLUE_500,
  BLUE_600,
  BLUE_700,
  BLUE_800,
  BLUE_900,

  INDIGO_50,
  INDIGO_100,
  INDIGO_200,
  INDIGO_300,
  INDIGO_400,
  INDIGO_500,
  INDIGO_600,
  INDIGO_700,
  INDIGO_800,
  INDIGO_900,

  VIOLET_50,
  VIOLET_100,
  VIOLET_200,
  VIOLET_300,
  VIOLET_400,
  VIOLET_500,
  VIOLET_600,
  VIOLET_700,
  VIOLET_800,
  VIOLET_900,

  PURPLE_50,
  PURPLE_100,
  PURPLE_200,
  PURPLE_300,
  PURPLE_400,
  PURPLE_500,
  PURPLE_600,
  PURPLE_700,
  PURPLE_800,
  PURPLE_900,

  FUCHSIA_50,
  FUCHSIA_100,
  FUCHSIA_200,
  FUCHSIA_300,
  FUCHSIA_400,
  FUCHSIA_500,
  FUCHSIA_600,
  FUCHSIA_700,
  FUCHSIA_800,
  FUCHSIA_900,

  PINK_50,
  PINK_100,
  PINK_200,
  PINK_300,
  PINK_400,
  PINK_500,
  PINK_600,
  PINK_700,
  PINK_800,
  PINK_900,

  ROSE_50,
  ROSE_100,
  ROSE_200,
  ROSE_300,
  ROSE_400,
  ROSE_500,
  ROSE_600,
  ROSE_700,
  ROSE_800,
  ROSE_900,

  STONE_50,
  STONE_100,
  STONE_200,
  STONE_300,
  STONE_400,
  STONE_500,
  STONE_600,
  STONE_700,
  STONE_800,
  STONE_900,

  NEUTRAL_50,
  NEUTRAL_100,
  NEUTRAL_200,
  NEUTRAL_300,
  NEUTRAL_400,
  NEUTRAL_500,
  NEUTRAL_600,
  NEUTRAL_700,
  NEUTRAL_800,
  NEUTRAL_900,

  ZINC_50,
  ZINC_100,
  ZINC_200,
  ZINC_300,
  ZINC_400,
  ZINC_500,
  ZINC_600,
  ZINC_700,
  ZINC_800,
  ZINC_900,

  SLATE_50,
  SLATE_100,
  SLATE_200,
  SLATE_300,
  SLATE_400,
  SLATE_500,
  SLATE_600,
  SLATE_700,
  SLATE_800,
  SLATE_900,
} as const;
