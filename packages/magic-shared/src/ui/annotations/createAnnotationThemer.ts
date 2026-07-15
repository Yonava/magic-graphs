import { CURSOR } from '@graph/plugins-shared/theme';

import { ComputedRef } from 'vue';

import { Graph } from '../../graph/types.ts';

export const createAnnotationThemer = (
  graph: Graph,
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
