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

export const CANVAS_ELEMENT_CURSOR_FIELD_KEY = 'cursor';

/**
 * manages the cursor type when hovering over the graph
 */
export const setupCanvasCursor = ({
  subscribe,
  canvas,
  getTheme,
  graphUnderCursor,
}: GraphCursorProps) => {
  const getCursor = (): Cursor => {
    const canvasTheme = getTheme('canvas.cursor');
    if (canvasTheme !== CURSOR_FALLBACK) return canvasTheme;

    const topElement = graphUnderCursor.elements.at(-1);
    if (!topElement) return CURSOR.DEFAULT;

    const elementCursor = topElement.data?.[CANVAS_ELEMENT_CURSOR_FIELD_KEY] as
      | Cursor
      | undefined;

    return elementCursor ?? CURSOR.DEFAULT;
  };

  const refreshCursor = () => {
    if (!canvas.value) return;
    const currentCursor = canvas.value.style.cursor;
    const newCursor = getCursor();
    if (currentCursor !== newCursor) canvas.value.style.cursor = newCursor;
  };

  subscribe('onDraw', refreshCursor);
};
