import { EventHub } from '../../events/createEventHub.ts';
import { CoreEventMap } from '../events.ts';
import { CoreControls } from '../types.ts';
import { propagateTransactionEvents } from './propagateTransactionEvents.ts';
import { TransactionOptions } from './types.ts';

type TransactionSucceededOptions = Pick<EventHub<CoreEventMap>, 'emit'> &
  Pick<CoreControls, 'nodes' | 'edges'>;

export const setupTransactionSucceeded = ({
  nodes,
  edges,
  emit,
}: TransactionSucceededOptions): TransactionOptions['onTransactionSucceeded'] => {
  return (payload) => {
    if (payload.removedNodeIds.length || payload.removedEdgeIds.length) {
      const removedNodeIds = new Set(payload.removedNodeIds);
      const removedEdgeIds = new Set(payload.removedEdgeIds);

      nodes.value = nodes.value.filter((n) => !removedNodeIds.has(n.id));
      edges.value = edges.value.filter((e) => !removedEdgeIds.has(e.id));
    }

    nodes.value.push(...payload.addedNodes);
    edges.value.push(...payload.addedEdges);

    propagateTransactionEvents(payload, emit);
  };
};
