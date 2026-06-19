import { EventHub } from '@magic/graph/events/createEventHub';
import { DeepReadonly } from 'ts-essentials';

import { CanvasEventMap } from './events.ts';
import { CanvasElement } from './types.ts';

export type HoveredElement = { value: DeepReadonly<CanvasElement> | undefined };

type SetupHoveredElement = (
  events: Pick<EventHub<CanvasEventMap>, 'subscribe' | 'emit'>,
) => HoveredElement;

export const setupOnHoveredElementChangeEvent: SetupHoveredElement = (
  events,
) => {
  let hoveredElement: HoveredElement = {
    value: undefined,
  };

  events.subscribe('onGraphUnderCursorChange', ({ elements }) => {
    const newHoveredElement = elements.at(-1);

    const processChange = () => {
      const previousHoveredElement = hoveredElement.value;
      hoveredElement.value = newHoveredElement;
      events.emit(
        'onHoveredElementChange',
        newHoveredElement,
        previousHoveredElement,
      );
    };

    if (!newHoveredElement) {
      const hasChanged = hoveredElement.value !== undefined;
      if (hasChanged) processChange();
      return;
    }

    if (!hoveredElement.value) return processChange();

    const hasChanged = hoveredElement.value.id !== newHoveredElement.id;
    if (hasChanged) processChange();
  });

  return hoveredElement;
};
