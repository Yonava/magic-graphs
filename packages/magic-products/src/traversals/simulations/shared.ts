import { nullThrows } from '@core/utils/assert';
import { AdjacencyList } from '@graph/plugins/adjacency-lists/types';
import { GNode } from '@magic/shared/graph';
import { MagicGraph } from '@magic/shared/product/useGraphProduct';
import { SimulationGuardBuilder } from '@magic/shared/simulation';
import { FrameCollectorFn } from '@magic/shared/simulation/types';
import { DeepReadonly } from 'ts-essentials';

import { Ref } from 'vue';

export type StartNodeId = Ref<GNode['id'] | undefined>;

export type TraversalSimulationOptions = {
  graph: MagicGraph;
  startNodeId: StartNodeId;
};

export type TraversalFunction<Frame> = (
  adjacencyList: DeepReadonly<AdjacencyList>,
  startNodeId: string,
) => FrameCollectorFn<Frame>;

export const traversalGuardChecker = (options: TraversalSimulationOptions) =>
  new SimulationGuardBuilder(options.graph)
    .custom(() => {
      const startNodeInNodes =
        options.startNodeId.value &&
        options.graph.nodes.value.some(
          (n) => n.id === options.startNodeId.value,
        );
      if (startNodeInNodes) return;
      return {
        id: 'no-start-node',
      };
    })
    .build();

export const traversalFrameCollector = <Frame>(
  options: TraversalSimulationOptions,
  traversalFunction: TraversalFunction<Frame>,
): FrameCollectorFn<Frame> => {
  return traversalFunction(
    options.graph.adjacencyLists.standard.value,
    nullThrows(options.startNodeId.value, 'start node id not defined'),
  );
};
