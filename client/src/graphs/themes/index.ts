import type { GNode, GEdge } from '@graph/types';
import type { ThemeGetter } from '@graph/themes/getThemeResolver';
import type {
  BaseGraphEdgeTheme,
  BaseGraphNodeTheme,
  GraphTheme as GraphThemeImport,
} from '@graph/themes/types';
import { DARK_THEME } from '@graph/themes/loadouts/dark';
import { LIGHT_THEME } from '@graph/themes/loadouts/light';
import { GIRL_THEME } from '@graph/themes/loadouts/girl';

export type GraphTheme = GraphThemeImport;
export type GraphThemeKey = keyof GraphTheme;

export const THEMES = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
  girl: GIRL_THEME,
} as const satisfies Record<string, GraphTheme>;

export type GraphThemeName = keyof typeof THEMES;

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
): BaseGraphNodeTheme => ({
  nodeSize: getTheme('nodeSize', node),
  nodeBorderWidth: getTheme('nodeBorderWidth', node),
  nodeColor: getTheme('nodeColor', node),
  nodeBorderColor: getTheme('nodeBorderColor', node),
  nodeTextSize: getTheme('nodeTextSize', node),
  nodeTextColor: getTheme('nodeTextColor', node),
  nodeText: getTheme('nodeText', node),
  nodeShape: getTheme('nodeShape', node),
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
): BaseGraphEdgeTheme => ({
  edgeWidth: getTheme('edgeWidth', edge),
  edgeColor: getTheme('edgeColor', edge),
  edgeText: getTheme('edgeText', edge),
  edgeTextSize: getTheme('edgeTextSize', edge),
  edgeTextColor: getTheme('edgeTextColor', edge),
  edgeTextFontWeight: getTheme('edgeTextFontWeight', edge),
});
