import { nullThrows } from '@core/utils/assert';
import { Color } from '@core/utils/colors';
import { CoreEdge } from '@graph/primitives/types';
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
import tinycolor from 'tinycolor2';

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

// candidate = a currently-eligible edge, weighed against the rest of the
//   candidate set, not yet resolved. a set, and stays lit for as long as an
//   edge stays eligible.
// crossing = the one or two edges actually in play this instant - either the
//   pair being weighed against each other, or the single edge just chosen.
// tree = an edge grown into the tree so far.
type PrimsEdgeConcept = 'candidate' | 'crossing' | 'tree';

const edgeRoles = {
  candidate: 'weighing',
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
  const candidateEdge = createEdgeIdThemer(graph, edgeRoles.candidate);
  const crossingEdge = createEdgeIdThemer(graph, edgeRoles.crossing);

  /*
    edges that were candidates at some point but can never be picked now -
    faded to a quarter alpha rather than given a flat color, the same
    technique the "total cost" chip uses to grey out non-mst edges. an id
    themer would replace the color outright; fading whatever is already
    there instead keeps this legible next to anything else painting the edge
  */
  const excludedIds = new Set<string>();
  const fadeExcluded = (edge: CoreEdge, resolveUnderneath: () => Color) => {
    if (!excludedIds.has(edge.id)) return;
    return tinycolor(resolveUnderneath()).setAlpha(0.25).toHex8String();
  };
  const excludedEdge = graph.theme.createThemer({
    canvas: {
      'edge.default.color': fadeExcluded,
      'edge.default.text.color': fadeExcluded,
      'edge.hover.color': fadeExcluded,
      'edge.hover.text.color': fadeExcluded,
    },
    focus: {
      'edge.focus.color': fadeExcluded,
      'edge.focus.text.color': fadeExcluded,
    },
  });

  // order matters: latter elements take priority over earlier ones. the anchor
  // sits below the role that describes what is happening right now, so the
  // node the user picked gives up its pink for the frame it is being worked on
  const themers = [
    frontier,
    settled,
    anchor,
    exploring,
    tree,
    candidateEdge,
    crossingEdge,
    { themer: excludedEdge },
  ];

  const syncToFrame = (frame: PrimsFrame) => {
    exploring.setId(frame.activeNodeId);
    settled.setIds(frame.treeNodeIds);
    frontier.setIds(frame.pendingNodeIds ?? []);
    anchor.setId(frame.anchorNodeId);
    tree.setIds(frame.treeEdgeIds);
    candidateEdge.setIds(frame.candidateEdges ?? []);
    // the pair being weighed and the final pick never coexist in the same
    // frame, so this is safe to merge into one themer rather than two
    crossingEdge.setIds([
      ...(frame.currentComparison ?? []),
      ...(frame.selectedEdge ? [frame.selectedEdge] : []),
    ]);
    excludedIds.clear();
    for (const id of frame.excludedEdgeIds) excludedIds.add(id);
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
