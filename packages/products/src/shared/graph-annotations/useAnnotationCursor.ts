import { CURSOR } from '@magic/graph/themes/cursor';
import { useTheme } from '@magic/graph/themes/useTheme';

import { ComputedRef } from 'vue';

import { Graph } from '../useGraphWithCanvas.ts';

export const useAnnotationCursor = (
  graph: Graph,
  hideCursor: ComputedRef<boolean>,
) => {
  const { setTheme, removeAllThemes } = useTheme(graph, 'product/annotations');

  const activate = () => {
    setTheme('canvas.cursor', () =>
      hideCursor.value ? CURSOR.NONE : CURSOR.CROSSHAIR,
    );
  };

  return {
    activate,
    deactivate: removeAllThemes,
  };
};
