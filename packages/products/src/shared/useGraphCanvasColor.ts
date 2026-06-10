import { readonly, ref } from 'vue';

import { Graph } from './useGraphWithCanvas.ts';

export const useGraphCanvasColor = (graph: Graph) => {
  const { events, getTheme } = graph;

  const patternColor = ref(getTheme('canvas.patternColor'));
  const bgColor = ref(getTheme('canvas.color'));

  const changeCanvasColor = async () => {
    patternColor.value = getTheme('canvas.patternColor');
    bgColor.value = getTheme('canvas.color');
  };

  events.subscribe('onThemeChange', changeCanvasColor);

  return {
    patternColor: readonly(patternColor),
    bgColor: readonly(bgColor),
  };
};

export type GraphCanvasColor = ReturnType<typeof useGraphCanvasColor>;
