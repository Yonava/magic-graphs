import { AnimatedShapeControls } from '@canvas/primitives/animation/index';
import { Coordinate } from '@graph/plugins-shared/drag';
import { EventHub } from '@graph/primitives/events/createEventHub';
import { DeepReadonly } from 'ts-essentials';

import { CanvasEventMap } from '../events.ts';
import { Aggregator, AggregatorTransformer, CanvasElement } from './types.ts';

export type AggregatorControls = {
  aggregator: () => DeepReadonly<Aggregator>;
  transformers: AggregatorTransformer[];
  updateAggregator: () => void;
  getCanvasElementsAtCoordinate: (coords: Coordinate) => CanvasElement[];
  draw: (ctx: CanvasRenderingContext2D) => void;
};

export const createAggregator = (
  { emit }: Pick<EventHub<CanvasEventMap>, 'emit'>,
  shapes: Pick<AnimatedShapeControls, 'drawGroup' | 'beginFrame' | 'endFrame'>,
): AggregatorControls => {
  let aggregator: Aggregator = [];
  const transformers: AggregatorTransformer[] = [];

  const updateAggregator = () => {
    const resolvedCanvasElements = transformers.reduce<Aggregator>(
      (acc, fn) => fn(acc),
      [],
    );

    aggregator = [
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
    emit('onBeforeDraw', ctx);
    updateAggregator();

    shapes.beginFrame();
    for (const group of groupByPriority(aggregator).values()) {
      shapes.drawGroup(
        ctx,
        group.map((item) => item.shape),
      );
    }
    shapes.endFrame(ctx);

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
    /*
      no sort here: the aggregator is built in priority order and nothing
      reorders it afterwards, so re-sorting was rewriting an already sorted
      array on every mousemove

      the bounding box test goes first where it can, since it is a handful of
      comparisons against a hitbox that walks segment lists for u-turns and
      scribbles. it does not go first for a shape carrying text: the box covers
      the shape alone, and a label reaches well outside a shape that is a few
      pixels thick, so pre-testing an edge would reject hits on its own weight
    */
    const point = { at: coords, width: 0, height: 0 };

    return aggregator.filter(({ shape }) => {
      if (!shape.textHitbox && !shape.efficientHitbox(point)) return false;
      return shape.hitbox(coords);
    });
  };

  return {
    aggregator: () => aggregator,
    transformers,
    updateAggregator,
    getCanvasElementsAtCoordinate,
    draw,
  };
};
