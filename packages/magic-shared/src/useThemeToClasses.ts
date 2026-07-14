import { computed } from 'vue';

import { ThemePreset } from './graph/index.ts';
import { useProvidedGraph } from './product/index.ts';

export const useThemeToClasses = (
  themeToClasses: Record<ThemePreset, string>,
) => {
  const graph = useProvidedGraph();
  return computed(() => themeToClasses[graph.activePreset.value]);
};
