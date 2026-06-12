import type { GEdge, GNode } from '../../../types.ts';
import type { TokenResolver } from '../themes/createTokenResolver.ts';
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

export const ALL_THEME_PRESETS = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
  pink: PINK_THEME,
} as const satisfies Record<string, GraphTheme>;

export type AllThemePresets = typeof ALL_THEME_PRESETS;

export type ThemePreset = keyof typeof ALL_THEME_PRESETS;

export const THEME_PRESETS = Object.keys(ALL_THEME_PRESETS) as ThemePreset[];

/**
 * resolves all StyleValues for a node by running each token through the override layers and preset fallback.
 *
 * @param resolveToken - the TokenResolver used to resolve each token to its final StyleValue
 * @param node - the node passed as the themeArg to node-scoped token getters
 * @returns the fully resolved StyleValues for the node
 */
export const resolveNodeStyles = (
  resolveToken: TokenResolver,
  node: GNode,
): CoreGraphNodeStyles => ({
  size: resolveToken('node.default.size', node),
  borderWidth: resolveToken('node.default.borderWidth', node),
  color: resolveToken('node.default.color', node),
  borderColor: resolveToken('node.default.borderColor', node),
  textSize: resolveToken('node.default.textSize', node),
  textColor: resolveToken('node.default.textColor', node),
  text: resolveToken('node.default.text', node),
  textFontWeight: resolveToken('node.default.textFontWeight', node),
  cursor: resolveToken('node.default.cursor', node),
});

/**
 * resolves all StyleValues for an edge by running each token through the override layers and preset fallback.
 *
 * @param resolveToken - the TokenResolver used to resolve each token to its final StyleValue
 * @param edge - the edge passed as the themeArg to edge-scoped token getters
 * @returns the fully resolved StyleValues for the edge
 */
export const resolveEdgeStyles = (
  resolveToken: TokenResolver,
  edge: GEdge,
): CoreGraphEdgeStyles => ({
  width: resolveToken('edge.default.width', edge),
  color: resolveToken('edge.default.color', edge),
  text: resolveToken('edge.default.text', edge),
  textSize: resolveToken('edge.default.textSize', edge),
  textColor: resolveToken('edge.default.textColor', edge),
  textFontWeight: resolveToken('edge.default.textFontWeight', edge),
});
