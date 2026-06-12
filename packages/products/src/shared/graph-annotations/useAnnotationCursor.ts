import { CURSOR } from '@magic/graph/plugins/canvas/themes/cursor';
import { GraphWithPlugins } from '@magic/graph/useGraph';

import { ComputedRef } from 'vue';

export const useAnnotationCursor = (
  graph: GraphWithPlugins,
  hideCursor: ComputedRef<boolean>,
) => {
  const { set, removeAll } = graph.canvas.theme.createLayer(
    'product/annotations',
  );

  const activate = () => {
    set('canvas.cursor', () =>
      hideCursor.value ? CURSOR.NONE : CURSOR.CROSSHAIR,
    );
  };

  return {
    activate,
    deactivate: removeAll,
  };
};
