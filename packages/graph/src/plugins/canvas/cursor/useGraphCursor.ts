import { nullThrows } from '@magic/utils/assert';

import { CoreGraph } from '../../../core/types.ts';
import { EventHub } from '../../../events/createEventHub.ts';
import { CanvasEventMap } from '../events.ts';
import { CanvasGraph } from '../types.ts';
import { GraphCursor } from './types.ts';

type GraphCursorProps = {
  subscribe: EventHub<CanvasEventMap>['subscribe'];
  canvas: CanvasGraph['magicCanvas']['canvas'];
  getNode: CoreGraph['getNode'];
  getTheme: CoreGraph['getTheme'];
};

/**
 * manages the cursor type when hovering over the graph
 *
 * @param subscribe - the event subscriber
 * @param canvas - the HTML canvas element
 * @param graphAtMousePosition - the graph items at the mouse position
 * @returns the cursor manager
 */
export const useGraphCursor = ({
  subscribe,
  canvas,
  getNode,
  getTheme,
}: GraphCursorProps): GraphCursor => {
  subscribe('onGraphUnderCursorChange', (graphUnderCursor) => {
    if (!canvas.value) return;
    const topElement = graphUnderCursor.elements.at(-1);
    canvas.value.style.cursor = 'pointer';
    if (!topElement) return;
    if (topElement.graphType === 'node') {
      const node = nullThrows(getNode(topElement.id), 'node not found');
      const cursor = getTheme('node.default.cursor', node);
      if (!canvas.value) return;
      canvas.value.style.cursor = cursor;
    }
  });

  return {};
};
