import { CURSOR } from '@magic/graph-plugins-shared/theme';

import { ComputedRef } from 'vue';

import { GraphWithPlugins } from '../useGraph.ts';

export const useAnnotationCursor = (
  graph: Omit<GraphWithPlugins, 'nodes' | 'edges'>,
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
