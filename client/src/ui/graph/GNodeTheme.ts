import colors, { type Color } from '@utils/colors';
import type { GraphThemeName } from '@graph/themes';

type GNodeTheme = {
  color: Color;
  textColor: Color;
};

export const GNodeTheme: Record<GraphThemeName, GNodeTheme> = {
  light: { color: colors.GRAY_300, textColor: colors.GRAY_900 },
  dark: { color: colors.GRAY_600, textColor: colors.GRAY_100 },
  pink: { color: colors.PINK_100, textColor: colors.PINK_800 },
};
