import { CoreControls } from '@magic/graph/core/types';
import { EventHub } from '@magic/graph/events/createEventHub';

import { CanvasEventMap } from './events.ts';
import { CURSOR, CURSOR_FALLBACK, Cursor } from './themes/cursor.ts';
import { CanvasGraphControls } from './types.ts';

type GraphCursorProps = {
  subscribe: EventHub<CanvasEventMap>['subscribe'];
  canvas: CanvasGraphControls['magicCanvas']['canvas'];
  getNode: CoreControls['getNode'];
  resolveToken: CanvasGraphControls['theme']['_resolveToken'];
  graphUnderCursor: CanvasGraphControls['graphUnderCursor'];
};

export const CANVAS_ELEMENT_CURSOR_FIELD_KEY = 'cursor';

const validCursors = new Set<string>(Object.values(CURSOR));

const isValidCursor = (cursorOrJunk: unknown): cursorOrJunk is Cursor =>
  typeof cursorOrJunk === 'string' && validCursors.has(cursorOrJunk);

/**
 * manages the cursor type when hovering over the graph
 */
export const setupCanvasCursor = ({
  subscribe,
  canvas,
  resolveToken,
  graphUnderCursor,
}: GraphCursorProps) => {
  const getCursor = (): Cursor => {
    const canvasTheme = resolveToken('canvas.cursor');
    if (canvasTheme !== CURSOR_FALLBACK) return canvasTheme;

    const topElement = graphUnderCursor.elements.at(-1);
    if (!topElement) return CURSOR.DEFAULT;

    const elementCursor = topElement.data?.[CANVAS_ELEMENT_CURSOR_FIELD_KEY];

    if (elementCursor === undefined) return CURSOR.DEFAULT;
    if (!isValidCursor(elementCursor)) {
      console.warn(`expected valid cursor: got "${elementCursor}"`);
      return CURSOR.DEFAULT;
    }

    return elementCursor;
  };

  const refreshCursor = () => {
    if (!canvas.value) return;
    const currentCursor = canvas.value.style.cursor;
    const newCursor = getCursor();
    if (currentCursor !== newCursor) canvas.value.style.cursor = newCursor;
  };

  subscribe('onDraw', refreshCursor);
};
