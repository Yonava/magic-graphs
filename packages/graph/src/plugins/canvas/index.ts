import { MagicCanvasProps } from '@magic/canvas/types';

import { ref } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { EventHub, createEventHub } from '../../events/createEventHub.ts';
import { mergeEventHubs } from '../../events/mergeEventHubs.ts';
import { CanvasEventMap, createCanvasEventBus } from './events.ts';
import { GraphWithCanvas } from './types.ts';
import { useAggregator } from './useAggregator.ts';

export const useCanvasPlugin = <
  TransactionWrapperOptions,
  EventMap extends BaseEventMap,
  Plugins,
>(
  graph: BaseGraph<TransactionWrapperOptions, EventMap, Plugins>,
  canvas: MagicCanvasProps,
): GraphWithCanvas<TransactionWrapperOptions, EventMap, Plugins> => {
  const canvasBus = createCanvasEventBus();
  const canvasHub: EventHub<CanvasEventMap> = createEventHub(canvasBus);
  const events = mergeEventHubs(
    canvasHub,
    // casting because graph.events could be arbitrarily broad due to it being stuffed with other events
    // from plugins upstream
    graph.events as EventHub<BaseEventMap>,
  );

  const aggregator = useAggregator({ emit: events.emit });

  const canvasFocused = ref(true);

  return {
    ...graph,
    events,
    canvas: {},
  };
};
