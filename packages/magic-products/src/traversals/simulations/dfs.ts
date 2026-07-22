import { nullThrows } from '@core/utils/assert';
import { Graph } from '@magic/shared/graph';
import { Lens } from '@magic/shared/lens';
import { MagicGraph } from '@magic/shared/product/useGraphProduct';
import {
  FrameCollector,
  SimulationDefinition,
  SimulationGuardBuilder,
} from '@magic/shared/simulation';

import { DeepReadonly } from 'vue';

import { StartNodeId } from './types.ts';

type DFSFrame = string;

const dfs =
  (graph: DeepReadonly<Record<string, string[]>>, start: string) =>
  (frameCollector: FrameCollector<DFSFrame>) => {
    if (!(start in graph)) return [];

    const visited = new Set<string>();
    const order: string[] = [];

    const visit = (node: string) => {
      if (visited.has(node)) return;
      visited.add(node);
      frameCollector.add(node);
      order.push(node);
      for (const neighbor of graph[node] ?? []) {
        visit(neighbor);
      }
    };

    visit(start);

    return order;
  };

export const useDFSSimulationDefinition = (
  graph: MagicGraph,
  startNodeId: StartNodeId,
): SimulationDefinition<DFSFrame> => {
  return {
    guard: new SimulationGuardBuilder(graph)
      .custom(() => {
        const startNodeInNodes =
          startNodeId.value &&
          graph.nodes.value.some((n) => n.id === startNodeId.value);
        if (!startNodeInNodes)
          return {
            id: 'no-start-node',
          };
      })
      .build(),
    collectFrames: (collector) => {
      dfs(
        graph.adjacencyLists.standard.value,
        nullThrows(startNodeId.value, 'start node id not defined'),
      )(collector);
    },
    setup: (context) => {
      const themer = graph.theme.createThemer({
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
        onViolation: graph.magic.simulation.stop,
      };
    },
  };
};
