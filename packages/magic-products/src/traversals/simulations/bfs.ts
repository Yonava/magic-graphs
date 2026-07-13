import { nullThrows } from '@core/utils/assert';
import { useProvidedGraph } from '@magic/shared/product';
import {
  FrameCollector,
  SimulationDefinition,
  SimulationGuard,
} from '@magic/shared/simulation';
import { useThemer } from '@magic/shared/themer';

import { DeepReadonly, defineAsyncComponent } from 'vue';

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

  const themer = useThemer({
    canvas: {
      'node.default.border.color': 'green',
    },
    focus: {
      'node.focus.size': 40,
    },
  });

  const simulation: SimulationDefinition<BFSFrame> = {
    guard: new SimulationGuard(graph).minNodes(1).custom(() => {
      const labels = graph.nodes.value.map((n) => graph.nodeLabel.get(n.id));
      if (labels.includes('E'))
        return {
          id: 'EEE',
          reason: 'EEEEE',
        };
      if (graph.nodes.value.length === 4) {
        return {
          id: 'rule-of-4',
          reason: '4 NODES!',
        };
      }
    }),
    collectFrames: (collector) => {
      const startNode = nullThrows(
        graph.nodes.value.at(0),
        'no nodes in graph!',
      );
      bfs(graph.adjacencyLists.standard.value, startNode.id)(collector);
    },
    initLens: (context) => {
      const id = 'bfs-sim';
      const themer = useThemer(
        {
          canvas: {
            'node.default.border.color': ({ id }) =>
              context.getCurrentFrame() === id ? 'red' : undefined,
          },
        },
        {
          layerId: id,
          graph,
        },
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
