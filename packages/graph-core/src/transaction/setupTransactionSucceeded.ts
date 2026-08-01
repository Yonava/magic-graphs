import { EventHub } from '@graph/primitives/events/createEventHub';
import { CoreEdge, CoreNode } from '@graph/primitives/types';
import { Signal } from '@reactive/primitives/index';

import { CoreEventMap } from '../events.ts';
import { TransactionOptions } from './types.ts';

type TransactionSucceededOptions = Pick<EventHub<CoreEventMap>, 'emit'> & {
  nodes: Signal<CoreNode[]>;
  edges: Signal<CoreEdge[]>;
};

export const setupTransactionSucceeded = ({
  nodes,
  edges,
  emit,
}: TransactionSucceededOptions): TransactionOptions['onTransactionSucceeded'] => {
  return (payload) => {
    // arrays are replaced rather than spliced in place. a signal only notifies when
    // its setter runs, so an in place splice would leave every derivation stale
    let nextNodes = nodes();
    let nextEdges = edges();

    if (payload.removedNodeIds.length || payload.removedEdgeIds.length) {
      const removedNodeIds = new Set(payload.removedNodeIds);
      const removedEdgeIds = new Set(payload.removedEdgeIds);

      nextNodes = nextNodes.filter((n) => !removedNodeIds.has(n.id));
      nextEdges = nextEdges.filter((e) => !removedEdgeIds.has(e.id));
    }

    // map to remove excess properties that may have snuck in due to TS structural typing
    if (payload.addedNodes.length) {
      nextNodes = [
        ...nextNodes,
        ...payload.addedNodes.map((n): CoreNode => ({ id: n.id })),
      ];
    }

    if (payload.addedEdges.length) {
      nextEdges = [
        ...nextEdges,
        ...payload.addedEdges.map((e): CoreEdge => ({
          id: e.id,
          source: e.source,
          target: e.target,
        })),
      ];
    }

    // a fresh array is never Object.is equal to the old one, so writing
    // unconditionally would notify every dependent on a transaction that changed nothing
    if (nextNodes !== nodes()) nodes(nextNodes);
    if (nextEdges !== edges()) edges(nextEdges);

    emit('onTransactionComplete', payload);
  };
};
