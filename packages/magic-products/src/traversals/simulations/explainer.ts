import { GEdge, GNode, Graph } from '@magic/shared/graph';
import { Explainer } from '@magic/shared/simulation';

import { TraversalFrame } from './frame.ts';
import { StartNodeId } from './shared.ts';

/**
 * the end of the edge that is not the node being traveled from. resolved this
 * way rather than reading edge.target, because on an undirected graph the
 * stored orientation says nothing about which way the traversal is walking
 */
const farEndOf = (
  graph: Graph,
  edgeId: GEdge['id'],
  fromNodeId: GNode['id'],
) => {
  const { sourceNode, targetNode } =
    graph.helpers.edges.getConnectedNodes(edgeId);
  return sourceNode.id === fromNodeId ? targetNode : sourceNode;
};

const QUEUE_TOOLTIP =
  'a breadth first search always takes the node that has been waiting longest, which is what makes it sweep the graph one whole layer at a time';

const DEPTH_TOOLTIP =
  'a depth first search commits to a path until it dead ends, then backtracks to the most recent node that still has an untried edge';

export const traversalExplainer =
  (graph: Graph, startNodeId: StartNodeId) =>
  (frame: TraversalFrame): Explainer | undefined => {
    if (frame.type === 'start') {
      const start = startNodeId.value;
      if (!start) return;
      return { content: `Starting the traversal at {${start}}` };
    }

    if (frame.type === 'end') {
      const visited = frame.visitedNodeIds?.length ?? 0;
      return {
        content: `Done. Reached ${visited} node${visited === 1 ? '' : 's'}`,
      };
    }

    if (frame.type === 'dequeue-node') {
      if (!frame.currentNodeId) return;
      const waiting = frame.queuedNodeIds?.length ?? 0;
      const tail = waiting
        ? `, ${waiting} still waiting behind it`
        : ', the last one waiting';
      return {
        content: `Taking {${frame.currentNodeId}} off the [queue]${tail}`,
        highlights: [{ tooltipLabel: QUEUE_TOOLTIP }],
      };
    }

    if (frame.type === 'explore-node') {
      if (!frame.currentNodeId) return;
      return {
        content: `Exploring {${frame.currentNodeId}}, going as [deep] as it can before turning back`,
        highlights: [{ tooltipLabel: DEPTH_TOOLTIP }],
      };
    }

    if (frame.type === 'travel-edge') {
      const from = frame.currentNodeId;
      if (!from) return;

      const to = farEndOf(graph, frame.traveledEdgeId, from);
      const seen =
        frame.visitedNodeIds?.includes(to.id) ||
        frame.queuedNodeIds?.includes(to.id);

      // said here rather than left to the next frame, because an edge leading
      // somewhere already seen produces no follow up frame at all
      const verdict = seen ? '. Already been there' : '';
      return { content: `Following the edge to {${to.id}}${verdict}` };
    }

    if (frame.type === 'enqueue-node') {
      // the node just pushed is the one at the back of the queue
      const justQueued = frame.queuedNodeIds?.at(-1);
      if (!justQueued) return;
      return {
        content: `{${justQueued}} is somewhere new, so it joins the back of the queue`,
      };
    }
  };
