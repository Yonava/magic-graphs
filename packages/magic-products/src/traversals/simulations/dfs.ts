import { Lens } from '@magic/shared/lens';
import { SimulationDefinition } from '@magic/shared/simulation';

import {
  TraversalFunction,
  TraversalSimulationOptions,
  traversalFrameCollector,
  traversalGuardChecker,
} from './shared.ts';

type DFSFrame = string;

const dfs: TraversalFunction<DFSFrame> =
  (adjList, start) => (frameCollector) => {
    if (!(start in adjList)) return;

    const visited = new Set<string>();

    const visit = (node: string) => {
      if (visited.has(node)) return;
      visited.add(node);
      frameCollector.add(node);
      for (const neighbor of adjList[node] ?? []) {
        visit(neighbor);
      }
    };

    visit(start);
  };

export const useDFSSimulationDefinition = (
  options: TraversalSimulationOptions,
): SimulationDefinition<DFSFrame> => {
  return {
    guard: traversalGuardChecker(options),
    collectFrames: traversalFrameCollector(options, dfs),
    setup: (context) => {
      const themer = options.graph.theme.createThemer({
        canvas: {
          'node.default.border.color': ({ id }) =>
            context.currentFrame.value === id ? 'red' : undefined,
        },
      });

      const dfsLens: Lens = {
        id: 'dfs-sim',
        activate: themer.activate,
        deactivate: themer.deactivate,
      };

      return {
        lens: dfsLens,
        onViolation: options.graph.magic.simulation.stop,
      };
    },
  };
};
