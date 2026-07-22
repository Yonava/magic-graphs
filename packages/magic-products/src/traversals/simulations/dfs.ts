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
    collectFrames: (collector) =>
      traversalFrameCollector(options, dfs)(collector),
    setup: (context) => {
      const themer = createNodeThemer(options.graph, ({ id }) =>
        context.currentFrame.value === id ? colors.AMBER_500 : undefined,
      );

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
