import type { GEdge, GNode } from '../../../types.ts';
import type { ThemeGetter } from '../themes/getThemeResolver.ts';
import type {
  CoreGraphEdgeStyles,
  CoreGraphNodeStyles,
  GraphTheme as GraphThemeImport,
} from '../themes/types.ts';
import { DARK_THEME } from './presets/dark.ts';
import { LIGHT_THEME } from './presets/light.ts';
import { PINK_THEME } from './presets/pink.ts';

/*
 * NOTE ON THEME TOKEN DESIGN:
 * Theme tokens are defined statically regardless of which plugins are loaded.
 * Focus tokens (e.g. node.focus.color) are intentionally designed to have no effect
 * if the focus plugin is not active. Making the theme schema dynamic based on
 * plugin composition would require the type system to track plugin state at
 * compile time, adding significant complexity for no real benefit.
 * Unused tokens are inert and harmless, and a static schema lets you
 * configure a complete theme upfront without knowing which plugins will be loaded.
 */

export type GraphTheme = GraphThemeImport;
export type GraphThemeKey = keyof GraphTheme;

export const THEME_PRESETS = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
  pink: PINK_THEME,
} as const satisfies Record<string, GraphTheme>;

export type ThemePresets = typeof THEME_PRESETS;

export type ThemePresetName = keyof typeof THEME_PRESETS;

export const THEME_PRESET_NAMES = Object.keys(
  THEME_PRESETS,
) as ThemePresetName[];

/**
 * gets the theme attributes for a GNode at the point in time the function is called
 *
 * @param getTheme - the theme getter function
 * @param node - the node to get the theme for
 * @returns the theme attributes for the node
 */
export const resolveThemeForNode = (
  getTheme: ThemeGetter,
  node: GNode,
): CoreGraphNodeStyles => ({
  size: getTheme('node.default.size', node),
  borderWidth: getTheme('node.default.borderWidth', node),
  color: getTheme('node.default.color', node),
  borderColor: getTheme('node.default.borderColor', node),
  textSize: getTheme('node.default.textSize', node),
  textColor: getTheme('node.default.textColor', node),
  text: getTheme('node.default.text', node),
  textFontWeight: getTheme('node.default.textFontWeight', node),
  cursor: getTheme('node.default.cursor', node),
});

/**
 * gets the theme attributes for a GEdge at the point in time the function is called
 *
 * @param getTheme - the theme getter function
 * @param edge - the edge to get the theme for
 * @returns the theme attributes for the edge
 */
export const resolveThemeForEdge = (
  getTheme: ThemeGetter,
  edge: GEdge,
): CoreGraphEdgeStyles => ({
  width: getTheme('edge.default.width', edge),
  color: getTheme('edge.default.color', edge),
  text: getTheme('edge.default.text', edge),
  textSize: getTheme('edge.default.textSize', edge),
  textColor: getTheme('edge.default.textColor', edge),
  textFontWeight: getTheme('edge.default.textFontWeight', edge),
});
