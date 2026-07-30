import { isTypingTarget } from '@core/utils/keyboard';
import { KeyboardEventMap, MouseEventMap } from '@core/utils/types';
import { EventHub } from '@graph/primitives/events/createEventHub';

import { CanvasEventMap, CanvasGraphMouseEvent } from './events.ts';

export const emitMouseEvents: (
  graphMouseEvent: (ev: MouseEvent) => CanvasGraphMouseEvent,
  emit: EventHub<CanvasEventMap>['emit'],
  updateGraphAtMousePosition: () => void,
) => Partial<MouseEventMap> = (
  graphMouseEvent,
  emit,
  updateGraphAtMousePosition,
) => ({
  click: (ev: MouseEvent) => {
    emit('onClick', graphMouseEvent(ev));
  },
  mousemove: (ev: MouseEvent) => {
    updateGraphAtMousePosition();
    emit('onMouseMove', graphMouseEvent(ev));
  },
  mousedown: (ev: MouseEvent) => {
    emit('onMouseDown', graphMouseEvent(ev));
  },
  mouseup: (ev: MouseEvent) => {
    emit('onMouseUp', graphMouseEvent(ev));
  },
  dblclick: (ev: MouseEvent) => {
    emit('onDblClick', graphMouseEvent(ev));
  },
  contextmenu: (ev: MouseEvent) => {
    emit('onContextMenu', graphMouseEvent(ev));
  },
});

/**
 * keyboard listeners live on document rather than the canvas element, so every
 * keystroke in the page reaches them, including ones aimed at a product side
 * panel or an edge weight textarea. those get dropped here so canvas keybinds
 * cannot swallow what the user is typing.
 */
export const emitKeyboardEvents = (
  emit: EventHub<CanvasEventMap>['emit'],
): Partial<KeyboardEventMap> => ({
  keydown: (ev: KeyboardEvent) => {
    if (isTypingTarget(ev)) return;
    emit('onKeyDown', ev);
  },
  keyup: (ev: KeyboardEvent) => {
    if (isTypingTarget(ev)) return;
    emit('onKeyUp', ev);
  },
});
