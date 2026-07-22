import { Lens } from '@magic/shared/lens';
import { SimulationDefinition } from '@magic/shared/simulation';

import {
  TraversalFunction,
  TraversalSimulationOptions,
  traversalFrameCollector,
  traversalGuardChecker,
} from './shared.ts';

type BFSFrame = string;

const bfs: TraversalFunction<BFSFrame> =
  (adjList, startNodeId) => (frameCollector) => {
    if (!(startNodeId in adjList)) return;

    const visited = new Set<string>([startNodeId]);
    const queue = [startNodeId];

    while (queue.length > 0) {
      const node = queue.shift()!;
      frameCollector.add(node);
      for (const neighbor of adjList[node] ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  };

export const useBFSSimulationDefinition = (
  options: TraversalSimulationOptions,
): SimulationDefinition<BFSFrame> => {
  return {
    guard: traversalGuardChecker(options),
    collectFrames: traversalFrameCollector(options, bfs),
    setup: (context) => {
      const themer = options.graph.theme.createThemer({
        canvas: {
          'node.default.border.color': ({ id }) =>
            context.currentFrame.value === id ? 'red' : undefined,
        },
      });

      const bfsLens: Lens = {
        id: 'bfs-sim',
        activate: themer.activate,
        deactivate: themer.deactivate,
      };

      return {
        lens: bfsLens,
        onViolation: options.graph.magic.simulation.stop,
      };
    },
  };
};
