import { readonly, ref } from 'vue';

import { Graph } from './useGraphWithCanvas.ts';

export const useGraphCanvasColor = (graph: Graph) => {
  const { events, getTheme } = graph;

  const patternColor = ref(getTheme('graph.patternColor'));
  const bgColor = ref(getTheme('graph.color'));

  const changeCanvasColor = async () => {
    patternColor.value = getTheme('graph.patternColor');
    bgColor.value = getTheme('graph.color');
  };

  events.subscribe('onThemeChange', changeCanvasColor);

  return {
    patternColor: readonly(patternColor),
    bgColor: readonly(bgColor),
  };
};

export type GraphCanvasColor = ReturnType<typeof useGraphCanvasColor>;
