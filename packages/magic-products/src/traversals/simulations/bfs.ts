import { nullThrows } from '@core/utils/assert';
import { Lens } from '@magic/shared/lens';
import { useProvidedGraph } from '@magic/shared/product';
import {
  FrameCollector,
  SimulationDefinition,
  SimulationGuardBuilder,
} from '@magic/shared/simulation';
import { useThemer } from '@magic/shared/themer';

import { DeepReadonly } from 'vue';

type BFSFrame = string;

const bfs =
  (graph: DeepReadonly<Record<string, string[]>>, start: string) =>
  (frameCollector: FrameCollector<BFSFrame>) => {
    if (!(start in graph)) return [];

    const visited = new Set<string>([start]);
    const queue = [start];
    const order: string[] = [];

    while (queue.length > 0) {
      const node = queue.shift()!;
      frameCollector.add(node);
      order.push(node);
      for (const neighbor of graph[node] ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return order;
  };

export const useSimulation = () => {
  const graph = useProvidedGraph();

  const simulation: SimulationDefinition<BFSFrame> = {
    guard: new SimulationGuardBuilder(graph).minNodes(1).build(),
    collectFrames: (collector) => {
      const startNode = nullThrows(
        graph.nodes.value.at(0),
        'no nodes in graph!',
      );
      bfs(graph.adjacencyLists.standard.value, startNode.id)(collector);
    },
    setup: (context) => {
      const id = 'bfs-sim';
      const themer = useThemer(
        {
          canvas: {
            'node.default.border.color': ({ id }) =>
              context.currentFrame.value === id ? 'red' : undefined,
          },
        },
        {
          layerId: id,
          graph,
        },
      );

      const bfsLens: Lens = {
        id,
        activate: themer.activate,
        deactivate: themer.deactivate,
      };

      return {
        lens: bfsLens,
      };
    },
  };

  return simulation;
};
