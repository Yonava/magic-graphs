import { nullThrows } from '@core/utils/assert';
import { GNode, Graph } from '@magic/shared/graph';
import { Lens } from '@magic/shared/lens';
import { SimulationGuardBuilder } from '@magic/shared/simulation';
import {
  FrameCollectorFn,
  SimulationDefinition,
} from '@magic/shared/simulation/types';
import {
  EdgeIdThemer,
  NodeIdThemer,
  createEdgeIdThemer,
  createNodeIdThemer,
} from '@magic/shared/theme';

import { Ref } from 'vue';

import Queued from './components/Queued.vue';
import Visited from './components/Visited.vue';
import { traversalExplainer } from './explainer.ts';
import { TraversalFrame } from './frame.ts';
import { TraversalSimulationOptions, edgeRoles, nodeRoles } from './index.ts';

export type StartNodeId = Ref<GNode['id'] | undefined>;

export type TraversalFunction = (
  graph: Graph,
  startNodeId: string,
) => FrameCollectorFn<TraversalFrame>;

/**
 * the edge a traversal crosses to get from one node to the next. throws rather
 * than returning undefined because both endpoints come from the adjacency list,
 * so a missing edge means the adjacency list and the edge set disagree
 */
export const edgeBetween = (
  graph: Graph,
  sourceNodeId: GNode['id'],
  targetNodeId: GNode['id'],
) =>
  nullThrows(
    graph.helpers.nodes.getEdgeBetween(sourceNodeId, targetNodeId),
    `no edge between ${sourceNodeId} and ${targetNodeId}`,
  ).id;

type TraversalThemers = {
  current: NodeIdThemer;
  visited: NodeIdThemer;
  queued: NodeIdThemer;
  traveled: EdgeIdThemer;
  lens: Lens;
  syncToFrame: (frame: TraversalFrame) => void;
};

const traversalThemers = (graph: Graph): TraversalThemers => {
  const current = createNodeIdThemer(graph, nodeRoles.current);
  const visited = createNodeIdThemer(graph, nodeRoles.visited);
  const queued = createNodeIdThemer(graph, nodeRoles.queued);
  const traveled = createEdgeIdThemer(graph, edgeRoles.traveled);
  const themers = [current, visited, queued, traveled];
  return {
    current,
    visited,
    queued,
    traveled,
    lens: {
      id: 'traversals',
      components: [
        { component: Visited, position: 'top-left' },
        { component: Queued, position: 'top-right' },
      ],
      activate: () => {
        for (const { themer } of themers) themer.activate();
      },
      deactivate: () => {
        for (const { themer } of themers) themer.deactivate();
      },
    },
    syncToFrame: (frame) => {
      const currentNodeId = frame.currentNodeId;
      // the current node is also a visited one, since arriving at a node visits
      // it. both themers would claim it and the winner would come down to their
      // order in the stack, so precedence is settled here instead: being the
      // node under the cursor outranks having already been seen
      const visitedNodeIds = (frame.visitedNodeIds ?? []).filter(
        (id) => id !== currentNodeId,
      );

      // only a travel-edge frame names an edge, so every other frame clears the
      // highlight. the crossing reads as a moment rather than a trail
      const traveledEdgeId =
        frame.type === 'travel-edge' ? frame.traveledEdgeId : undefined;

      current.setId(currentNodeId);
      visited.setIds(visitedNodeIds);
      queued.setIds(frame.queuedNodeIds ?? []);
      traveled.setId(traveledEdgeId);
    },
  };
};

export const traversalSimulationDefinition = (
  traversal: TraversalFunction,
  options: TraversalSimulationOptions,
): SimulationDefinition<TraversalFrame> => {
  return {
    guard: new SimulationGuardBuilder(options.graph)
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
      .build(),
    collectFrames: (collector) => {
      traversal(
        options.graph,
        nullThrows(options.startNodeId.value, 'start node id not defined'),
      )(collector);
    },
    setup: () => {
      const { lens, syncToFrame } = traversalThemers(options.graph);
      return {
        lens,
        explainer: traversalExplainer(options.graph, options.startNodeId),
        onSetupCompleted: syncToFrame,
        onFrameTransition: syncToFrame,
        onViolation: options.graph.magic.simulation.stop,
      };
    },
  };
};
