import { CURSOR } from '@magic/graph/themes/cursor';
import { useTheme } from '@magic/graph/themes/useTheme';
import { GraphWithPlugins } from '@magic/graph/useGraph';

import { ComputedRef } from 'vue';

export const useAnnotationCursor = (
  graph: GraphWithPlugins,
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
