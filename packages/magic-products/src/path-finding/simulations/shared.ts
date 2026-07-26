import { nullThrows } from '@core/utils/assert';
import { GNode } from '@magic/shared/graph';
import { Lens } from '@magic/shared/lens';
import { MagicGraph } from '@magic/shared/product/useGraphProduct';
import { SimulationGuardBuilder } from '@magic/shared/simulation';
import {
  SimulationDefinition,
  SimulationEffects,
} from '@magic/shared/simulation/types';
import {
  EdgeRole,
  NodeRole,
  createEdgeIdThemer,
  createNodeIdThemer,
} from '@magic/shared/theme';

import { Ref } from 'vue';

import { AllPairsFunction, SingleSourceFunction } from './arcs.ts';
import Distances from './components/Distances.vue';
import Frontier from './components/Frontier.vue';
import Matrix from './components/Matrix.vue';
import { pathFindingExplainer } from './explainer.ts';
import { PathFindingFrame } from './frame.ts';
import { PathFindingSimulationOptions } from './index.ts';

// exploring = the node the algorithm is standing on this frame.
// weighing = a node whose distance is being compared against a fresh offer.
// finalized = its distance is final, no later step can beat it.
// frontier = discovered, with a tentative distance that may still improve.
// source = the node the user picked to measure every distance from.
type PathFindingConcept =
  'exploring' | 'weighing' | 'finalized' | 'frontier' | 'source';

export const nodeRoles = {
  exploring: 'active',
  weighing: 'candidate',
  finalized: 'settled',
  frontier: 'pending',
  source: 'anchor',
} as const satisfies Record<PathFindingConcept, NodeRole>;

// relaxing = the edge whose weight is being tested this frame.
// shortestPath = an edge on one of the best paths found so far.
// discarded = an edge tested this frame that offered nothing better.
type PathFindingEdgeConcept = 'relaxing' | 'shortestPath' | 'discarded';

export const edgeRoles = {
  relaxing: 'crossing',
  shortestPath: 'tree',
  discarded: 'rejected',
} as const satisfies Record<PathFindingEdgeConcept, EdgeRole>;

export type SourceNodeId = Ref<GNode['id'] | undefined>;

export const slotIds = {
  distances: 'path-finding/distances',
  frontier: 'path-finding/frontier',
  matrix: 'path-finding/matrix',
} as const;

const pathFindingEffects = (
  graph: MagicGraph,
): SimulationEffects<PathFindingFrame> => {
  const frontier = createNodeIdThemer(graph, nodeRoles.frontier);
  const finalized = createNodeIdThemer(graph, nodeRoles.finalized);
  const source = createNodeIdThemer(graph, nodeRoles.source);
  const weighing = createNodeIdThemer(graph, nodeRoles.weighing);
  const exploring = createNodeIdThemer(graph, nodeRoles.exploring);

  const shortestPath = createEdgeIdThemer(graph, edgeRoles.shortestPath);
  const discarded = createEdgeIdThemer(graph, edgeRoles.discarded);
  const relaxing = createEdgeIdThemer(graph, edgeRoles.relaxing);

  // order matters: latter elements take priority over earlier ones. the source
  // sits below the two roles that describe what is happening right now, so the
  // node the user picked gives up its pink for the frame it is being worked on
  const themers = [
    frontier,
    finalized,
    source,
    weighing,
    exploring,
    shortestPath,
    discarded,
    relaxing,
  ];

  const lens: Lens = {
    id: 'path-finding',
    components: [
      { component: Distances, position: 'center-left', id: slotIds.distances },
      { component: Matrix, position: 'center-left', id: slotIds.matrix },
      { component: Frontier, position: 'center-right', id: slotIds.frontier },
    ],
    activate: () => {
      for (const { themer } of themers) themer.activate();
    },
    deactivate: () => {
      for (const { themer } of themers) themer.deactivate();
    },
  };

  const syncToFrame = (frame: PathFindingFrame) => {
    exploring.setId(frame.activeNodeId);
    weighing.setIds(frame.candidateNodeIds ?? []);
    finalized.setIds(frame.settledNodeIds ?? []);
    frontier.setIds(frame.pendingNodeIds ?? []);
    source.setId(frame.anchorNodeId);
    relaxing.setIds(frame.relaxingEdgeIds ?? []);
    shortestPath.setIds(frame.treeEdgeIds ?? []);
    discarded.setIds(frame.rejectedEdgeIds ?? []);
  };

  return {
    lens,
    explainer: pathFindingExplainer(graph),
    onSetupCompleted: syncToFrame,
    onFrameTransition: syncToFrame,
    onViolation: graph.magic.simulation.stop,
  };
};

export const singleSourceSimulationDefinition = (
  algorithm: SingleSourceFunction,
  options: PathFindingSimulationOptions,
): SimulationDefinition<PathFindingFrame> => ({
  guard: new SimulationGuardBuilder(options.graph)
    .custom(() => {
      const sourceInNodes = options.graph.nodes.value.some(
        (node) => node.id === options.sourceNodeId.value,
      );
      if (sourceInNodes) return;
      return { id: 'no-source-node' };
    })
    .build(),
  collectFrames: (collector) => {
    algorithm(
      options.graph,
      nullThrows(options.sourceNodeId.value, 'source node id not defined'),
    )(collector);
  },
  setup: () => pathFindingEffects(options.graph),
});

export const allPairsSimulationDefinition = (
  algorithm: AllPairsFunction,
  options: PathFindingSimulationOptions,
): SimulationDefinition<PathFindingFrame> => ({
  guard: new SimulationGuardBuilder(options.graph).minNodes(1).build(),
  collectFrames: (collector) => {
    algorithm(options.graph)(collector);
  },
  setup: () => pathFindingEffects(options.graph),
});
