import { EventHub } from '@graph/primitives/events/createEventHub';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { CoreEventMap } from '../events.ts';
import { propagateTransactionEvents } from './propagateTransactionEvents.ts';
import { TransactionOptions } from './types.ts';

type TransactionSucceededOptions = Pick<EventHub<CoreEventMap>, 'emit'> & {
  nodes: CoreNode[];
  edges: CoreEdge[];
};

export const setupTransactionSucceeded = ({
  nodes,
  edges,
  emit,
}: TransactionSucceededOptions): TransactionOptions['onTransactionSucceeded'] => {
  return (payload) => {
    if (payload.removedNodeIds.length || payload.removedEdgeIds.length) {
      const removedNodeIds = new Set(payload.removedNodeIds);
      const removedEdgeIds = new Set(payload.removedEdgeIds);

      const remainingNodes = nodes.filter((n) => !removedNodeIds.has(n.id));
      nodes.length = 0;
      nodes.push(...remainingNodes);

      const remainingEdges = edges.filter((e) => !removedEdgeIds.has(e.id));
      edges.length = 0;
      edges.push(...remainingEdges);
    }

    nodes.push(...payload.addedNodes);
    edges.push(...payload.addedEdges);

    propagateTransactionEvents(payload, emit);
  };
};
