import { EventHub } from '@graph/primitives/events/createEventHub';
import { KeyboardEventMap, MouseEventMap } from '@core/utils/types';

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
    ev.preventDefault();
    emit('onClick', graphMouseEvent(ev));
  },
  mousemove: (ev: MouseEvent) => {
    ev.preventDefault();
    updateGraphAtMousePosition();
    emit('onMouseMove', graphMouseEvent(ev));
  },
  mousedown: (ev: MouseEvent) => {
    ev.preventDefault();
    emit('onMouseDown', graphMouseEvent(ev));
  },
  mouseup: (ev: MouseEvent) => {
    ev.preventDefault();
    emit('onMouseUp', graphMouseEvent(ev));
  },
  dblclick: (ev: MouseEvent) => {
    ev.preventDefault();
    emit('onDblClick', graphMouseEvent(ev));
  },
  contextmenu: (ev: MouseEvent) => {
    emit('onContextMenu', graphMouseEvent(ev));
  },
});

export const emitKeyboardEvents = (
  emit: EventHub<CanvasEventMap>['emit'],
): Partial<KeyboardEventMap> => ({
  keydown: (ev: KeyboardEvent) => emit('onKeyDown', ev),
  keyup: (ev: KeyboardEvent) => emit('onKeyUp', ev),
});
