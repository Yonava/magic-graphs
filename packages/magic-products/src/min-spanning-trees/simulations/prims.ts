import { GEdge, GNode } from '@magic/shared/graph';

import { PrimsFrame, PrimsFunction, PrimsHighlights, PrimsStep } from './frame.ts';

/**
 * Grows a minimum spanning tree from a single start node. Every round weighs
 * the whole cut at once - every edge with exactly one endpoint in the tree -
 * rather than one edge at a time, then takes the cheapest of them, calling
 * out ties rather than breaking them silently.
 *
 * A graph the start node cannot reach is not swept into a forest the way the
 * batch algorithm in `@graph/algorithms` does it - those nodes are reported
 * as unreachable instead.
 */
export const prims: PrimsFunction = (graph, startNodeId) => (frameCollector) => {
  const nodeIds = graph.nodes.value.map((node) => node.id);
  if (!nodeIds.includes(startNodeId)) return;

  const inTree = new Set<GNode['id']>([startNodeId]);
  const treeEdges: GEdge['id'][] = [];

  const crossingEdges = () =>
    graph.edges.value.filter((edge) => inTree.has(edge.source) !== inTree.has(edge.target));

  const farNode = (edge: { source: GNode['id']; target: GNode['id'] }) =>
    inTree.has(edge.source) ? edge.target : edge.source;

  /** the endpoint of a crossing edge that is already in the tree - where the offer is coming from */
  const treeNode = (edge: { source: GNode['id']; target: GNode['id'] }) =>
    inTree.has(edge.source) ? edge.source : edge.target;

  const frame = <T extends PrimsStep>(
    fields: T & PrimsHighlights,
  ): PrimsFrame => ({
    treeNodeIds: [...inTree],
    treeEdgeIds: [...treeEdges],
    anchorNodeId: startNodeId,
    ...fields,
  });

  frameCollector.add(
    frame({ type: 'start', start: startNodeId, activeNodeId: startNodeId }),
  );

  for (let frontier = crossingEdges(); frontier.length > 0; frontier = crossingEdges()) {
    const frontierEdgeIds = frontier.map((edge) => edge.id);
    const frontierNodeIds = [...new Set(frontier.map(farNode))];

    /*
      no activeNodeId here on purpose: the whole cut is being weighed at once,
      possibly from several different tree nodes at the same time, so there is
      no single node to point to yet. pinning it to "whichever node grew the
      tree last" would draw the eye to a spot that may have nothing to do with
      whichever edge turns out cheapest
    */
    frameCollector.add(
      frame({
        type: 'consider-edges',
        edges: frontierEdgeIds,
        pendingNodeIds: frontierNodeIds,
        frontierEdgeIds,
      }),
    );

    const cheapestWeight = frontier.reduce(
      (min, edge) => (edge.weight.lt(min) ? edge.weight : min),
      frontier[0].weight,
    );
    const cheapest = frontier.filter((edge) => edge.weight.equals(cheapestWeight));
    /*
      picking cheapest[0] here would always favor whichever tied edge happens
      to sit earliest in the graph's edge array (creation order) - and the
      batch MST algorithm behind the "total cost" chip breaks ties the exact
      same way (a stable sort keeps equal-weight edges in that same array
      order). with that shared bias, a heavily-tied graph would quietly
      converge on the same one "arbitrary" tree almost every run, no matter
      the start node, even when dozens of equally valid MSTs exist. picking
      randomly among the tied edges keeps every valid MST reachable
    */
    const winner = cheapest[Math.floor(Math.random() * cheapest.length)];
    const winnerNode = farNode(winner);
    // where the winning offer actually came from, wherever that is in the
    // tree - not necessarily wherever the previous round left off
    const winnerSource = treeNode(winner);

    /*
      the rest of this round's frontier stays exactly as it was in the
      consider-edges frame above - it is still unresolved, so it keeps its
      highlight rather than going dark and re-lighting next round, which read
      as the same edge being flagged, cleared, then flagged again
    */
    frameCollector.add(
      frame({
        type: 'select-edge',
        edge: winner.id,
        node: winnerNode,
        tiedEdges: cheapest.length > 1 ? cheapest.map((edge) => edge.id) : undefined,
        activeNodeId: winnerSource,
        pendingNodeIds: frontierNodeIds,
        frontierEdgeIds,
        activeEdgeId: winner.id,
      }),
    );

    inTree.add(winnerNode);
    treeEdges.push(winner.id);
    
  }

  const unreachable = nodeIds.filter((id) => !inTree.has(id));

  if (unreachable.length > 0) {
    frameCollector.add(frame({ type: 'unreachable', nodes: unreachable }));
  }

  frameCollector.add(frame({ type: 'end' }));
};
