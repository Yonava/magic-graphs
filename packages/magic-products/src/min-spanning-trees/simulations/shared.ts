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

import { primsExplainer } from './explainer.ts';
import { PrimsFrame, PrimsFunction } from './frame.ts';

// exploring = the tree-side node the current decision is anchored to - where
//   the edge being taken (or just taken) actually comes from, which can be
//   anywhere the tree already reaches.
// settled = already grown into the tree.
// frontier = the far side of a crossing edge - outside the tree, being
//   weighed as a set alongside the rest of the frontier. paired with the
//   'weighing' edge role below so a cyan node always sits at the far end of
//   a cyan edge.
// anchor = the node the user picked to grow the tree from.
type PrimsNodeConcept = 'exploring' | 'settled' | 'frontier' | 'anchor';

const nodeRoles = {
  exploring: 'active',
  settled: 'settled',
  frontier: 'candidate',
  anchor: 'anchor',
} as const satisfies Record<PrimsNodeConcept, NodeRole>;

// frontier = crossing the cut, weighed against the rest of the frontier, not
//   yet resolved. a set, and stays lit for as long as an edge stays unresolved.
// crossing = the one edge actually being taken into the tree this round.
// tree = an edge grown into the tree so far.
type PrimsEdgeConcept = 'frontier' | 'crossing' | 'tree';

const edgeRoles = {
  frontier: 'weighing',
  crossing: 'crossing',
  tree: 'tree',
} as const satisfies Record<PrimsEdgeConcept, EdgeRole>;

export type StartNodeId = Ref<GNode['id'] | undefined>;

export type PrimsSimulationOptions = {
  graph: MagicGraph;
  startNodeId: StartNodeId;
};

const primsEffects = (graph: MagicGraph): SimulationEffects<PrimsFrame> => {
  const frontier = createNodeIdThemer(graph, nodeRoles.frontier);
  const settled = createNodeIdThemer(graph, nodeRoles.settled);
  const anchor = createNodeIdThemer(graph, nodeRoles.anchor);
  const exploring = createNodeIdThemer(graph, nodeRoles.exploring);

  const tree = createEdgeIdThemer(graph, edgeRoles.tree);
  const frontierEdge = createEdgeIdThemer(graph, edgeRoles.frontier);
  const crossingEdge = createEdgeIdThemer(graph, edgeRoles.crossing);

  // order matters: latter elements take priority over earlier ones. the anchor
  // sits below the role that describes what is happening right now, so the
  // node the user picked gives up its pink for the frame it is being worked on
  const themers = [
    frontier,
    settled,
    anchor,
    exploring,
    tree,
    frontierEdge,
    crossingEdge,
  ];

  const syncToFrame = (frame: PrimsFrame) => {
    exploring.setId(frame.activeNodeId);
    settled.setIds(frame.treeNodeIds);
    frontier.setIds(frame.pendingNodeIds ?? []);
    anchor.setId(frame.anchorNodeId);
    tree.setIds(frame.treeEdgeIds);
    frontierEdge.setIds(frame.frontierEdgeIds ?? []);
    crossingEdge.setId(frame.activeEdgeId);
  };

  const lens: Lens = {
    id: 'min-spanning-trees/prims',
    activate: () => {
      for (const { themer } of themers) themer.activate();
    },
    deactivate: () => {
      for (const { themer } of themers) themer.deactivate();
    },
  };

  return {
    lens,
    explainer: primsExplainer(graph),
    onSetupCompleted: syncToFrame,
    onFrameTransition: syncToFrame,
    onViolation: graph.magic.simulation.stop,
  };
};

export const primsSimulationDefinition = (
  prims: PrimsFunction,
  options: PrimsSimulationOptions,
): SimulationDefinition<PrimsFrame> => ({
  guard: new SimulationGuardBuilder(options.graph)
    .custom(() => {
      const startNodeInNodes = options.graph.nodes.value.some(
        (node) => node.id === options.startNodeId.value,
      );
      if (startNodeInNodes) return;
      return { id: 'no-start-node' };
    })
    .build(),
  collectFrames: (collector) => {
    prims(
      options.graph,
      nullThrows(options.startNodeId.value, 'start node id not defined'),
    )(collector);
  },
  setup: () => primsEffects(options.graph),
});
