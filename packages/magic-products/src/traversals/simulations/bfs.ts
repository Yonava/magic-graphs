import colors from '@core/utils/colors';
import { Lens } from '@magic/shared/lens';
import { SimulationDefinition } from '@magic/shared/simulation';
import { createNodeThemer } from '@magic/shared/utilities';

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
    collectFrames: (collector) =>
      traversalFrameCollector(options, bfs)(collector),
    setup: (context) => {
      const themer = createNodeThemer(options.graph, ({ id }) =>
        context.currentFrame.value === id ? colors.AMBER_500 : undefined,
      );

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
