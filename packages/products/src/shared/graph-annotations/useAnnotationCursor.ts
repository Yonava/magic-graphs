import { CURSOR } from '@magic/graph/plugins/canvas/themes/cursor';

import { ComputedRef } from 'vue';

import { GraphWithPlugins } from '../useGraph.ts';

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
