import { watch } from 'vue';
import { useDark } from '@vueuse/core';
import type { BaseGraph } from '@graph/base';
import { useLocalStorage } from '@vueuse/core';
import { THEME_NAMES, type GraphThemeName } from '.';
// @typescript-eslint/no-unused-vars reports unused even if referenced in jsdoc
// eslint-disable-next-line
import type { Graph } from '@graph/types';
import { localKeys } from '@utils/localStorage';

export type PreferredGraphTheme = GraphThemeName | 'auto';

const DEFAULT_THEME: PreferredGraphTheme = 'auto';

/**
 * creates a `ref` that when changed updates the
 * {@link Graph.themeName | graph theme} and saves the preference
 * to local storage for future sessions or when another graph is created that implements
 * `usePreferredTheme`
 *
 * @param graph the graph instance
 */
export const usePreferredTheme = (graph: BaseGraph) => {
  const isDark = useDark();
  const preferredTheme = useLocalStorage<PreferredGraphTheme>(
    localKeys.preferredTheme,
    DEFAULT_THEME,
  );

  watch(
    isDark,
    () => {
      if (preferredTheme.value !== 'auto') return;
      graph.themeName.value = isDark.value ? 'dark' : 'light';
    },
    { immediate: true },
  );

  watch(
    preferredTheme,
    () => {
      // preferred theme comes from localStorage and can be tampered with, so the value cannot be trusted!
      if (![...THEME_NAMES, 'auto'].includes(preferredTheme.value)) {
        console.warn('unrecognized preferred-theme in localStorage: falling back to', DEFAULT_THEME)
        preferredTheme.value = DEFAULT_THEME
      }

      if (preferredTheme.value === 'auto') {
        graph.themeName.value = isDark.value ? 'dark' : 'light';
      } else {
        graph.themeName.value = preferredTheme.value;
      }
    },
    { immediate: true },
  );

  return {
    preferredTheme,
  };
};
