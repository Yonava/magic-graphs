import type { ThemeGetter } from '../themes/getThemeResolver.ts';
import { DARK_THEME } from '../themes/loadouts/dark.ts';
import { LIGHT_THEME } from '../themes/loadouts/light.ts';
import { PINK_THEME } from '../themes/loadouts/pink.ts';
import type {
  CoreGraphEdgeStyles,
  CoreGraphNodeStyles,
  GraphTheme as GraphThemeImport,
} from '../themes/types.ts';
import type { GEdge, GNode } from '../types.ts';

export type GraphTheme = GraphThemeImport;
export type GraphThemeKey = keyof GraphTheme;

export const THEME_LOADOUTS = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
  pink: PINK_THEME,
} as const satisfies Record<string, GraphTheme>;

export type ThemeLoadouts = typeof THEME_LOADOUTS;

export type GraphThemeName = keyof typeof THEME_LOADOUTS;

export const THEME_NAMES = Object.keys(THEME_LOADOUTS) as GraphThemeName[];

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
