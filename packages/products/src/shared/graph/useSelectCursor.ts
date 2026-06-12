import { CURSOR } from '@magic/graph/plugins/canvas/themes/cursor';
import { CanvasElement } from '@magic/graph/plugins/canvas/types';

import { Graph } from '../useGraphWithCanvas.ts';

export const useSelectCursor = (
  graph: Graph,
  predicate: (element: CanvasElement) => boolean,
) => {
  const { set, removeAll } = graph.canvas.theme.createLayer('product/select');

  const activate = () => {
    set('canvas.cursor', () => {
      const element = graph.canvas.graphUnderCursor.elements.at(-1);
      if (!element) return CURSOR.DEFAULT;
      const isSelectable = predicate(element);
      return isSelectable ? CURSOR.POINTER : CURSOR.DEFAULT;
    });
  };

  return {
    activate,
    deactivate: removeAll,
  };
};
