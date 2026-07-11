import { useProvidedGraph } from '@magic/shared/product';
import { FrameCollector, Simulation } from '@magic/shared/simulation';
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

  const simulation: Simulation<BFSFrame> = {
    collectFrames: (collector) =>
      bfs(
        graph.adjacencyLists.standard.value,
        graph.nodes.value[0].id,
      )(collector),
    initLens: (context) => {
      const id = 'bfs-sim';
      const themer = useThemer(
        {
          canvas: {
            'node.default.border.color': ({ id }) =>
              context.getCurrentFrame() === id ? 'red' : undefined,
          },
        },
        id,
      );

      return {
        id,
        setup: themer.activate,
        teardown: themer.deactivate,
      };
    },
  };

  return simulation;
};
