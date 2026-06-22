import { EventHub } from '@magic/graph/events/createEventHub';
import { drawGroup } from '@magic/shapes/drawGroup';

import { ref } from 'vue';

import { Coordinate } from '../../shared/types.ts';
import { CanvasEventMap } from './events.ts';
import type {
  Aggregator,
  AggregatorTransformer,
  CanvasElement,
} from './themes.ts';

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

  const groupByPriority = (elements: Aggregator): Map<number, Aggregator> => {
    const groups = new Map<number, Aggregator>();
    for (const item of elements) {
      const group = groups.get(item.priority) ?? [];
      group.push(item);
      groups.set(item.priority, group);
    }
    return groups;
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    updateAggregator();

    for (const group of groupByPriority(aggregator.value).values()) {
      drawGroup(
        ctx,
        group.map((item) => item.shape),
      );
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
