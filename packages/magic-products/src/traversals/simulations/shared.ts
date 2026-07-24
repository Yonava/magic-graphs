import { nullThrows } from '@core/utils/assert';
import { GNode, Graph } from '@magic/shared/graph';
import { Lens } from '@magic/shared/lens';
import { SimulationGuardBuilder } from '@magic/shared/simulation';
import {
  FrameCollectorFn,
  SimulationDefinition,
} from '@magic/shared/simulation/types';
import {
  NodeIdThemer,
  createNodeIdThemer,
} from '@magic/shared/utilities/createNodeThemer';

import { Ref } from 'vue';

import { TraversalSimulationOptions } from './index.ts';

export type StartNodeId = Ref<GNode['id'] | undefined>;

export type TraversalFunction = (
  graph: Graph,
  startNodeId: string,
) => FrameCollectorFn<TraversalFrame>;

type TraversalFrame = {
  currentNodeId: GNode['id'];
  visitedNodeIds: readonly GNode['id'][];
};

const traversalGuardChecker = (options: TraversalSimulationOptions) =>
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

const traversalFrameCollector = (
  options: TraversalSimulationOptions,
  traversalFunction: TraversalFunction,
): FrameCollectorFn<TraversalFrame> => {
  return traversalFunction(
    options.graph,
    nullThrows(options.startNodeId.value, 'start node id not defined'),
  );
};

type TraversalThemers = {
  current: NodeIdThemer;
  visited: NodeIdThemer;
  lens: Lens;
  syncToFrame: (frame: TraversalFrame) => void;
};

const traversalThemers = (graph: Graph): TraversalThemers => {
  const current = createNodeIdThemer(graph, 'primary');
  const visited = createNodeIdThemer(graph, 'secondary');
  return {
    current,
    visited,
    lens: {
      id: 'traversals',
      activate: () => {
        current.themer.activate();
        visited.themer.activate();
      },
      deactivate: () => {
        current.themer.deactivate();
        visited.themer.deactivate();
      },
    },
    syncToFrame: (frame) => {
      current.setNodeId(frame.currentNodeId);
      visited.setNodeIds(frame.visitedNodeIds);
    },
  };
};

export const traversalSimulationDefinition = (
  traversal: TraversalFunction,
  options: TraversalSimulationOptions,
): SimulationDefinition<TraversalFrame> => {
  return {
    guard: traversalGuardChecker(options),
    collectFrames: (collector) =>
      traversalFrameCollector(options, traversal)(collector),
    setup: () => {
      const { lens, syncToFrame } = traversalThemers(options.graph);
      return {
        lens: lens,
        onSetupCompleted: syncToFrame,
        onFrameTransition: syncToFrame,
        onViolation: options.graph.magic.simulation.stop,
      };
    },
  };
};
