import type { ThemeGetter } from '../themes/getThemeResolver.ts';
import { DARK_THEME } from '../themes/loadouts/dark.ts';
import { LIGHT_THEME } from '../themes/loadouts/light.ts';
import { PINK_THEME } from '../themes/loadouts/pink.ts';
import type {
  BaseGraphEdgeStyles,
  BaseGraphNodeStyles,
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
): BaseGraphNodeStyles => ({
  size: getTheme('node.base.size', node),
  borderWidth: getTheme('node.base.borderWidth', node),
  color: getTheme('node.base.color', node),
  borderColor: getTheme('node.base.borderColor', node),
  textSize: getTheme('node.base.textSize', node),
  textColor: getTheme('node.base.textColor', node),
  text: getTheme('node.base.text', node),
  textFontWeight: getTheme('node.base.textFontWeight', node),
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
): BaseGraphEdgeStyles => ({
  width: getTheme('edge.base.width', edge),
  color: getTheme('edge.base.color', edge),
  text: getTheme('edge.base.text', edge),
  textSize: getTheme('edge.base.textSize', edge),
  textColor: getTheme('edge.base.textColor', edge),
  textFontWeight: getTheme('edge.base.textFontWeight', edge),
});
