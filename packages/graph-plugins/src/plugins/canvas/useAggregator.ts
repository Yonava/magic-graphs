import { EventHub } from '@magic/graph/events/createEventHub';

import { ref } from 'vue';

import { Coordinate } from '../../shared/types.ts';
import { CanvasEventMap } from './events.ts';
import type {
  Aggregator,
  AggregatorTransformer,
  CanvasElement,
} from './types.ts';

export const useAggregator = ({
  emit,
}: Pick<EventHub<CanvasEventMap>, 'emit'>) => {
  const aggregator = ref<Aggregator>([]);
  const transformers: AggregatorTransformer[] = [];

  const updateAggregator = () => {
    const resolvedCanvasElements = transformers.reduce<Aggregator>(
      (acc, fn) => fn(acc),
      [],
    );

    aggregator.value = [
      ...resolvedCanvasElements.sort((a, b) => a.priority - b.priority),
    ];
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    updateAggregator();

    const indexOfLastEdge = aggregator.value.findLastIndex(
      (item) => item.graphType === 'edge',
    );

    const beforeLastEdge = aggregator.value.slice(0, indexOfLastEdge + 1);
    const afterLastEdge = aggregator.value.slice(indexOfLastEdge + 1);

    for (const item of beforeLastEdge) {
      item.shape.drawShape(ctx);
    }

    for (const item of beforeLastEdge) {
      item.shape.drawTextAreaMatte?.(ctx);
    }

    for (const item of beforeLastEdge) {
      item.shape.drawText?.(ctx);
    }

    for (const item of afterLastEdge) {
      item.shape.draw(ctx);
    }

    emit('onDraw', ctx);
  };

  /**
   * Returns all canvas elements at given coordinate
   *
   * @param coords Point in canvas space to test against {@link CanvasElement.shape | element} hitboxes
   * @returns All canvas elements whose hitbox contains coords, ordered back-to-front by z-priority
   * @example const els = getCanvasElementsAtCoordinate({ x: 200, y: 550 })
   * console.log(els) // [node, nodeAnchor] meaning nodeAnchor is above the node
   */
  const getCanvasElementsAtCoordinate = (coords: Coordinate) => {
    return aggregator.value
      .sort((a, b) => a.priority - b.priority)
      .filter((element) => element.shape.hitbox(coords));
  };

  return {
    aggregator,
    transformers,
    updateAggregator,
    getCanvasElementsAtCoordinate,
    draw,
  };
};

export type AggregatorProps = ReturnType<typeof useAggregator>;
