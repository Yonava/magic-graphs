import { CURSOR } from '@magic/graph/plugins/canvas/themes/cursor';
import { useTheme } from '@magic/graph/plugins/canvas/themes/useTheme';
import { CanvasElement } from '@magic/graph/plugins/canvas/types';

import { Graph } from '../useGraphWithCanvas.ts';

export const useSelectCursor = (
  graph: Graph,
  predicate: (element: CanvasElement) => boolean,
) => {
  const { setTheme, removeAllThemes } = graph.canvas.useTheme('product/select');

  const activate = () => {
    setTheme('canvas.cursor', () => {
      const element = graph.canvas.graphUnderCursor.elements.at(-1);
      if (!element) return CURSOR.DEFAULT;
      const isSelectable = predicate(element);
      return isSelectable ? CURSOR.POINTER : CURSOR.DEFAULT;
    });
  };

  return {
    activate,
    deactivate: removeAllThemes,
  };
};
