import { generateId } from '@magic/utils/id';

import type { ValidGraphThemePath } from '../themes/types';
import type { Graph } from '../types';
import { ResolveThemeMap, getDataFromNestedPath } from './getThemeResolver';

/**
 * set and remove themes for a graph instance
 *
 * @param graph - the graph instance you want to set themes for
 * @param themeId - identifier for this useTheme instance, handy for debugging
 * @returns functions to set and remove themes
 */
export const useTheme = <TGraph extends Pick<Graph, 'themeMap'>>(
  graph: TGraph,
  themeId = generateId(),
) => {
  /** all theme paths that are themes assigned to them */
  const activeThemePaths = new Set<ValidGraphThemePath>();

  /**
   * set a theme value for a specific theme property in your graph.
   *
   * @param prop - the theme property you want to set
   * @param value - the value you want to set for the theme property
   */
  const setTheme = <Path extends ValidGraphThemePath>(
    themePath: Path,
    value: ResolveThemeMap<Path>[number]['value'],
  ) => {
    const themeMapEntries = getDataFromNestedPath(graph.themeMap, themePath);
    if (!themeMapEntries) {
      console.warn(
        `Attempted to set theme ${value} to ${themePath} but property ${themePath} was not recognized`,
      );
      return;
    }
    themeMapEntries.push({
      // @ts-expect-error Safe: The consumer arguments are strictly typed to match 'themePath',
      // but TS cannot internally correlate the dynamic lookup array with the resolved generic union.
      value,
      useThemeId: themeId,
    });

    activeThemePaths.add(themePath);
  };

  /**
   * removes a theme value for a specific theme property attached to this useTheme instance
   *
   * @param themePath - the theme property you want to remove
   */
  const removeTheme = (themePath: ValidGraphThemePath) => {
    const themeMapEntries = getDataFromNestedPath(graph.themeMap, themePath);
    if (!themeMapEntries) {
      console.warn(
        `Attempted to remove theme from ${themePath} but property ${themePath} was not recognized`,
      );
      return;
    }

    const index = themeMapEntries.findIndex(
      (entry) => entry.useThemeId === themeId,
    );

    if (index === -1) {
      console.warn(
        `Attempted to remove theme ${themePath} with themeId ${themeId} but no theme was found`,
      );
      return;
    }

    themeMapEntries.splice(index, 1);
    activeThemePaths.delete(themePath);
  };

  /**
   * removes all themes attached to this useTheme instance
   */
  const removeAllThemes = () => {
    for (const prop of activeThemePaths) removeTheme(prop);
  };

  return {
    setTheme,
    removeTheme,
    removeAllThemes,
  };
};
