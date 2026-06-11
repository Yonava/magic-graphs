import { nullThrows } from '@magic/utils/assert';

import { CoreGraph } from '../../core/types.ts';
import { EventHub } from '../../events/createEventHub.ts';
import { CanvasEventMap } from './events.ts';
import { CURSOR, CURSOR_FALLBACK, Cursor } from './themes/cursor.ts';
import { CanvasGraph } from './types.ts';

type GraphCursorProps = {
  subscribe: EventHub<CanvasEventMap>['subscribe'];
  canvas: CanvasGraph['magicCanvas']['canvas'];
  getNode: CoreGraph['getNode'];
  getTheme: CanvasGraph['getTheme'];
  graphUnderCursor: CanvasGraph['graphUnderCursor'];
};

/**
 * manages the cursor type when hovering over the graph
 */
export const useGraphCursor = ({
  subscribe,
  canvas,
  getNode,
  getTheme,
  graphUnderCursor,
}: GraphCursorProps) => {
  const getCursor = (): Cursor => {
    const canvasTheme = getTheme('canvas.cursor');
    if (canvasTheme !== CURSOR_FALLBACK) return canvasTheme;

    const topElement = graphUnderCursor.elements.at(-1);
    if (!topElement) return CURSOR.DEFAULT;

    if (topElement.graphType === 'node') {
      const node = nullThrows(getNode(topElement.id), 'node not found');
      return getTheme('node.default.cursor', node);
    }

    if (topElement.graphType === 'encapsulated-node-box') {
      return getTheme('marquee.encapsulatedNodeBox.cursor');
    }

    if (topElement.graphType === 'node-anchor') {
      const node = nullThrows(
        getNode(topElement.data!.nodeId as string),
        'cannot resolve node on node anchor data',
      );
      return getTheme('nodeAnchor.default.cursor', node);
    }

    return CURSOR.DEFAULT;
  };

  const refreshCursor = () => {
    if (!canvas.value) return;
    canvas.value.style.cursor = getCursor();
  };

  subscribe('onDraw', refreshCursor);
};
