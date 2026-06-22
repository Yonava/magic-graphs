import { CoreEdge, CoreNode } from '@magic/graph/types';

import type { GraphTheme as GraphThemeImport } from '../themes.ts';
import { DARK_THEME } from './presets/dark.ts';
import { LIGHT_THEME } from './presets/light.ts';
import { PINK_THEME } from './presets/pink.ts';

export type GraphTheme = GraphThemeImport;
export type GraphThemeKey = keyof GraphTheme;

export const ALL_THEME_PRESETS = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
  pink: PINK_THEME,
} as const satisfies Record<string, GraphTheme>;

export type AllThemePresets = typeof ALL_THEME_PRESETS;

export type ThemePreset = keyof typeof ALL_THEME_PRESETS;

export const THEME_PRESETS = Object.keys(ALL_THEME_PRESETS) as ThemePreset[];
