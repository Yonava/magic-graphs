import { graph } from '@graph/global';
import colors from '@utils/colors';

import { computed } from 'vue';

import type { GraphThemeName } from '.';

type GraphColors = {
  primary: string;
  secondary: string;
  tertiary: string;
  contrast: string;
  text: string;
  brand: string;
};

export const ThemeToGraphColors: Record<GraphThemeName, GraphColors> = {
  light: {
    primary: colors.GRAY_300,
    secondary: colors.GRAY_200,
    tertiary: colors.GRAY_400,
    contrast: colors.GRAY_800,
    text: colors.GRAY_900,
    brand: 'magic',
  },
  dark: {
    primary: colors.GRAY_800,
    secondary: colors.GRAY_700,
    tertiary: colors.GRAY_900,
    contrast: colors.GRAY_200,
    text: colors.GRAY_100,
    brand: 'magic',
  },
  pink: {
    primary: colors.PINK_700,
    secondary: colors.PINK_600,
    tertiary: colors.PINK_800,
    contrast: colors.PINK_200,
    text: colors.WHITE,
    brand: 'pink-magic',
  },
};

export const useGraphColors = () =>
  computed(() => {
    if (!graph.value) return;
    const theme = graph.value.themeName.value;
    return ThemeToGraphColors[theme];
  });

export const useNonNullGraphColors = () =>
  computed(() => {
    if (!graph.value) throw 'global graph state not set';
    const theme = graph.value.themeName.value;
    return ThemeToGraphColors[theme];
  });
