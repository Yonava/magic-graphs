import { watch } from 'vue';
import { useDark } from '@vueuse/core';
import type { BaseGraph } from '@graph/base';
import { useLocalStorage } from '@vueuse/core';
import type { GraphThemeName } from '.';

export type PreferredGraphTheme = GraphThemeName | 'auto';

const DEFAULT_THEME: PreferredGraphTheme = 'auto';

/**
 * creates a `ref` that when changed updates the {@link Graph.themeName | graph theme} and saves the preference
 * to local storage for future sessions or when another graph is created that implements
 * `usePreferredTheme`
 *
 * @param graph the graph instance
 */
export const usePreferredTheme = (graph: BaseGraph) => {
  const isDark = useDark();
  const preferredTheme = useLocalStorage<PreferredGraphTheme>(
    'preferred-theme',
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
