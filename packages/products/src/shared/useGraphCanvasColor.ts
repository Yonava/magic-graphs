import type { Graph } from '@magic/graph/types';

import { readonly, ref } from 'vue';

export const useGraphCanvasColor = (graph: Graph) => {
  const { subscribe, getTheme } = graph;

  const patternColor = ref(getTheme('graphBgPatternColor'));
  const bgColor = ref(getTheme('graphBgColor'));

  const changeCanvasColor = async () => {
    patternColor.value = getTheme('graphBgPatternColor');
    bgColor.value = getTheme('graphBgColor');
  };

  subscribe('onThemeChange', changeCanvasColor);

  return {
    patternColor: readonly(patternColor),
    bgColor: readonly(bgColor),
  };
};

export type GraphCanvasColor = ReturnType<typeof useGraphCanvasColor>;
