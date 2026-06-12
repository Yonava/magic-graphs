import { generateId } from '@magic/utils/id';

import type { ThemeToken } from '../themes/types.ts';
import { TokenOverrides, getDataFromNestedPath } from './getThemeResolver.ts';
import { ThemeOverrides } from './types.ts';

export type UseThemeControls = {
  /**
   * set a theme value for a specific theme property in your graph.
   *
   * @param prop - the theme property you want to set
   * @param value - the value you want to set for the theme property
   */
  setTheme: <Path extends ThemeToken>(
    themePath: Path,
    value: TokenOverrides<Path>[number]['value'],
  ) => void;
  /**
   * removes a theme value for a specific theme property attached to this useTheme instance
   *
   * @param themePath - the theme property you want to remove
   */
  removeTheme: (themePath: ThemeToken) => void;
  /**
   * removes all themes attached to this useTheme instance
   */
  removeAllThemes: () => void;
};

/**
 * set and remove themes for a graph instance
 *
 * @param graph - the graph instance you want to set themes for
 * @param themeId - identifier for this useTheme instance, handy for debugging
 * @returns functions to set and remove themes
 */
export const useTheme = (
  themeOverrides: ThemeOverrides,
  themeId = generateId(),
): UseThemeControls => {
  /** all theme paths that are themes assigned to them */
  const activeThemePaths = new Set<ThemeToken>();

  const setTheme = <Path extends ThemeToken>(
    themePath: Path,
    value: TokenOverrides<Path>[number]['value'],
  ) => {
    if (activeThemePaths.has(themePath)) {
      console.warn(
        `Attempted to set theme property ${themePath} multiple times with the same useTheme instance`,
      );
      return;
    }

    const overrides = getDataFromNestedPath(themeOverrides, themePath);
    if (!overrides) {
      console.warn(
        `Attempted to set theme ${value} to ${themePath} but property ${themePath} was not recognized`,
      );
      return;
    }

    overrides.push({
      // @ts-expect-error Safe: The consumer arguments are strictly typed to match 'themePath',
      // but TS cannot internally correlate the dynamic lookup array with the resolved generic union.
      value,
      useThemeId: themeId,
    });

    activeThemePaths.add(themePath);
  };

  const removeTheme = (themePath: ThemeToken) => {
    const overrides = getDataFromNestedPath(themeOverrides, themePath);
    if (!overrides) {
      console.warn(
        `Attempted to remove theme from ${themePath} but property ${themePath} was not recognized`,
      );
      return;
    }

    const index = overrides.findIndex(
      (entry) => entry.useThemeId === themeId,
    );

    if (index === -1) {
      console.warn(
        `Attempted to remove theme ${themePath} with themeId ${themeId} but no theme was found`,
      );
      return;
    }

    overrides.splice(index, 1);
    activeThemePaths.delete(themePath);
  };

  const removeAllThemes = () => {
    for (const prop of activeThemePaths) removeTheme(prop);
  };

  return {
    setTheme,
    removeTheme,
    removeAllThemes,
  };
};
