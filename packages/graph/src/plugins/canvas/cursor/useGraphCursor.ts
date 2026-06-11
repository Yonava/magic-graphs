import { nullThrows } from '@magic/utils/assert';

import { CoreGraph } from '../../../core/types.ts';
import { EventHub } from '../../../events/createEventHub.ts';
import { CURSOR, Cursor } from '../../../themes/cursor.ts';
import { CanvasEventMap } from '../events.ts';
import { CanvasGraph } from '../types.ts';

type GraphCursorProps = {
  subscribe: EventHub<CanvasEventMap>['subscribe'];
  canvas: CanvasGraph['magicCanvas']['canvas'];
  getNode: CoreGraph['getNode'];
  getTheme: CoreGraph['getTheme'];
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
    // canvas theme has been deliberately set
    if (canvasTheme !== null) return canvasTheme;

    const topElement = graphUnderCursor.elements.at(-1);
    if (!topElement) return CURSOR.DEFAULT;

    if (topElement.graphType === 'node') {
      const node = nullThrows(getNode(topElement.id), 'node not found');
      return getTheme('node.default.cursor', node);
    }

    return CURSOR.DEFAULT;
  };

  const refreshCursor = () => {
    if (!canvas.value) return;
    canvas.value.style.cursor = getCursor();
  };

  subscribe('onDraw', refreshCursor);
};
