import { localKeys } from '@magic/utils/localStorage';
import { useDark } from '@vueuse/core';
import { useLocalStorage } from '@vueuse/core';

import { watch } from 'vue';

import { GraphWithPlugins } from '../../../useGraph.ts';
import { THEME_PRESET_NAMES, type ThemePresetName } from './index.ts';

export type PreferredGraphTheme = ThemePresetName | 'auto';

const DEFAULT_THEME: PreferredGraphTheme = 'auto';

/**
 * creates a `ref` that when changed updates the
 * {@link GraphWithPlugins.themeName | graph theme} and saves the preference
 * to local storage for future sessions or when another graph is created that implements
 * `usePreferredTheme`
 *
 * @param graph the graph instance
 */
export const usePreferredTheme = (graph: GraphWithPlugins) => {
  const isDark = useDark();
  const preferredTheme = useLocalStorage<PreferredGraphTheme>(
    localKeys.preferredTheme,
    DEFAULT_THEME,
  );

  watch(
    isDark,
    () => {
      if (preferredTheme.value !== 'auto') return;
      graph.canvas.themeName.value = isDark.value ? 'dark' : 'light';
    },
    { immediate: true },
  );

  watch(
    preferredTheme,
    () => {
      // preferred theme comes from localStorage and can be tampered with, so the value cannot be trusted!
      if (![...THEME_PRESET_NAMES, 'auto'].includes(preferredTheme.value)) {
        console.warn(
          'unrecognized preferred-theme in localStorage: falling back to',
          DEFAULT_THEME,
        );
        preferredTheme.value = DEFAULT_THEME;
      }

      if (preferredTheme.value === 'auto') {
        graph.canvas.themeName.value = isDark.value ? 'dark' : 'light';
      } else {
        graph.canvas.themeName.value = preferredTheme.value;
      }
    },
    { immediate: true },
  );

  return {
    preferredTheme,
  };
};
