import { Graph } from '@magic/shared/graph';
import { Explainer, ExplainerHighlight } from '@magic/shared/simulation';

import { TraversalFrame } from './frame.ts';
import { StartNodeId } from './shared.ts';

const highlights = {
  queue: {
    tooltipLabel: 'Queue',
  },
  enqueue: {
    tooltipLabel: 'Enqueue',
  },
  dequeue: {
    tooltipLabel: 'Dequeue',
  },
  visited: {
    tooltipLabel: 'Visited',
  },
} as const satisfies Record<string, ExplainerHighlight>;

export const traversalExplainer =
  (graph: Graph, startNodeId: StartNodeId) =>
  (frame: TraversalFrame): Explainer | undefined => {
    if (frame.type === 'start') {
      const queuedNode = frame.queuedNodeIds?.[0];
      if (queuedNode)
        return {
          content: `Adding Starting Node {${queuedNode}} to [Queue]`,
          highlights: [highlights.queue],
        };
      return {
        content: `Starting Depth-First Search at {${startNodeId.value}}`,
      };
    }

    if (frame.type === 'end') {
      const visited = frame.visitedNodeIds?.length ?? 0;
      return {
        content: `Done! [Visited] ${visited} Node${visited === 1 ? '' : 's'} Total`,
        highlights: [highlights.visited],
      };
    }

    if (frame.type === 'explore-node') {
      const hasQueue = !!frame.queuedNodeIds;
      if (hasQueue)
        return {
          content: `[Dequeuing] and Exploring {${frame.exploredNode}}`,
          highlights: [highlights.dequeue],
        };
      return {
        content: `Exploring {${frame.exploredNode}}`,
      };
    }

    if (frame.type === 'mark-visited') {
      return {
        content: `Marking {${frame.node}} as [Visited]`,
        highlights: [highlights.visited],
      };
    }

    if (frame.type === 'travel-edge') {
      const edges = frame.traveledEdgeIds?.map((id) => graph.getEdge(id)) ?? [];
      const nodeTargets = edges.map((e) => e.target);
      const nodeTargetsStr = nodeTargets.map((id) => `{${id}}`).join(', ');
      return { content: `Following Edge to ${nodeTargetsStr}` };
    }

    if (frame.type === 'enqueue-node') {
      return {
        content: `{${frame.node}} Not In [Visited], Therefore, [Enqueuing]`,
        highlights: [highlights.visited, highlights.enqueue],
      };
    }

    if (frame.type === 'previously-visited') {
      return {
        content: `{${frame.node}} Is In [Visited]. Therefore, We Ignore It`,
        highlights: [highlights.visited],
      };
    }
  };
