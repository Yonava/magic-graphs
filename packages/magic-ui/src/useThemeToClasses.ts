import { ThemePreset } from '@magic/shared/graph';
import { useProvidedGraph } from '@magic/shared/product';

import { computed } from 'vue';

export const useThemeToClasses = (
  themeToClasses: Record<ThemePreset, string>,
) => {
  const graph = useProvidedGraph();
  return computed(() => themeToClasses[graph.activePreset.value]);
};
