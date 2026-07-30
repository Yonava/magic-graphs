import { AnimatedShapeControls } from '@canvas/primitives/animation/index';
import { Coordinate } from '@graph/plugins-shared/drag';
import { EventHub } from '@graph/primitives/events/createEventHub';
import { DeepReadonly } from 'ts-essentials';

import { CanvasEventMap } from '../events.ts';
import { Aggregator, AggregatorTransformer, CanvasElement } from './types.ts';

export type AggregatorControls = {
  aggregator: () => DeepReadonly<Aggregator>;
  transformers: AggregatorTransformer[];
  /**
   * Rebuilds every canvas element from the transformers, now.
   *
   * Reach for this after changing something a transformer reads that the graph
   * itself never hears about, such as a plugin's own local state.
   */
  updateAggregator: () => void;
  /**
   * Marks the current elements as out of date without rebuilding them, leaving
   * the work to whoever next needs them.
   *
   * This is the one to call on a change that has no deadline of its own, which
   * is most of them: the draw loop rebuilds every frame regardless.
   */
  invalidate: () => void;
  /**
   * Rebuilds only if something has been {@link AggregatorControls.invalidate |
   * invalidated} since the last one.
   *
   * For callers that run far more often than the graph changes, where a
   * rebuild per call is mostly wasted work.
   */
  updateAggregatorIfStale: () => void;
  getCanvasElementsAtCoordinate: (coords: Coordinate) => CanvasElement[];
  draw: (ctx: CanvasRenderingContext2D) => void;
};

export const createAggregator = (
  { emit }: Pick<EventHub<CanvasEventMap>, 'emit'>,
  shapes: Pick<AnimatedShapeControls, 'drawGroup' | 'beginFrame' | 'endFrame'>,
): AggregatorControls => {
  let aggregator: Aggregator = [];
  const transformers: AggregatorTransformer[] = [];

  /*
    a rebuild runs every transformer, which reconstructs every node and edge
    shape, re-resolves every theme token behind them and re-measures every
    label. it is the most expensive thing in the plugin, and it was running on
    every mousemove on top of the identical rebuild the draw loop was already
    doing. a high polling rate mouse triggers several of those per frame, so
    most of them produced shapes nobody ever drew

    hence the flag, and hence two ways to ask for a rebuild rather than one.
    the draw loop keeps rebuilding unconditionally: shapes depend on hover
    state, and the frame boundary is where that is worth re-reading
  */
  let stale = true;

  const updateAggregator = () => {
    const resolvedCanvasElements = transformers.reduce<Aggregator>(
      (acc, fn) => fn(acc),
      [],
    );

    aggregator = [
      ...resolvedCanvasElements.sort((a, b) => a.priority - b.priority),
    ];

    stale = false;
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
    return aggregator
      .sort((a, b) => a.priority - b.priority)
      .filter((element) => element.shape.hitbox(coords));
  };

  return {
    aggregator: () => aggregator,
    transformers,
    updateAggregator,
    invalidate: () => (stale = true),
    updateAggregatorIfStale: () => {
      if (stale) updateAggregator();
    },
    getCanvasElementsAtCoordinate,
    draw,
  };
};
