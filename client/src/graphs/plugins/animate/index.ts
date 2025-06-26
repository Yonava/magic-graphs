import type { BaseGraph } from '@graph/base';
import type { GraphHistoryPlugin } from '../history';
import type { GraphFocusPlugin } from '../focus';
import type { GraphMarqueePlugin } from '../marquee';
import type { GraphPersistentPlugin } from '../persistent';
import { ANIMATE_NODE_MOVE_OPTIONS_DEFAULTS } from './types';
import type { AnimateNodeMoveOptions } from './types';
import { interpolateCoordinate } from '@shape/animation/interpolation/coordinate';
import { EASING_PRESETS } from '@shape/animation/easing';

export const useAnimation = (
  graph: BaseGraph &
    GraphHistoryPlugin &
    GraphFocusPlugin &
    GraphMarqueePlugin &
    GraphPersistentPlugin,
) => {
  const animateNode = async (options: AnimateNodeMoveOptions) => {
    const { nodeId, endCoords, durationMs, history, broadcast, persist } = {
      ...ANIMATE_NODE_MOVE_OPTIONS_DEFAULTS,
      ...options,
    };

    if (durationMs < 100)
      throw new Error(`durationMs must be greater than 100, got ${durationMs}`);

    const node = graph.getNode(nodeId);
    if (!node) throw new Error(`Node with id ${nodeId} not found`);

    const startCoords = { x: node.x, y: node.y };

    const animationFn = interpolateCoordinate(
      [
        {
          progress: 0,
          value: startCoords,
        },
        {
          progress: 1,
          value: endCoords,
        }
      ],
      EASING_PRESETS['in-out'],
      endCoords,
    );

    for (let i = 0; i < durationMs; i++) {
      await new Promise((res) => setTimeout(res, 1));
      const coord = animationFn(i / durationMs)
      graph.moveNode(node.id, coord, { broadcast });
      if (graph.focus.isFocused(node.id)) {
        graph.marquee.updateEncapsulatedNodeBox();
      }
    }

    if (history) {
      graph.history.addToUndoStack({
        action: 'move',
        affectedItems: [
          {
            graphType: 'node',
            data: {
              id: options.nodeId,
              from: startCoords,
              to: options.endCoords,
            },
          },
        ],
      });
    }

    if (persist) await graph.persistent.trackGraphState();
  };

  return {
    node: animateNode,
  };
};
