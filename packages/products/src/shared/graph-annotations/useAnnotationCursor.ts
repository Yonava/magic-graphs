import { CURSOR } from '@magic/graph/plugins/canvas/themes/cursor';
import { GraphWithPlugins } from '@magic/graph/useGraph';

import { ComputedRef } from 'vue';

export const useAnnotationCursor = (
  graph: GraphWithPlugins,
  hideCursor: ComputedRef<boolean>,
) => {
  const { setTheme, removeAllThemes } = graph.canvas.useTheme(
    'product/annotations',
  );

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
