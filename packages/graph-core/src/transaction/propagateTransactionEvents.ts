import { EventHub } from '@graph/primitives/events/createEventHub';
import { TransactionPayload } from '@graph/primitives/transactions/types';

import { CoreEventMap } from '../events.ts';

type TransactionEventPayloadResolverMap = {
  [EventName in keyof CoreEventMap]: (payload: TransactionPayload) => {
    args: Parameters<CoreEventMap[EventName]>;
  } | void;
};

type EventMapPropagationPredicates =
  Partial<TransactionEventPayloadResolverMap>;

const hasItems = (...arrays: any[][]) => arrays.some((arr) => arr.length > 0);

const eventNameToPredicateMap: EventMapPropagationPredicates = {
  onNodesAdded: ({ addedNodes }) => {
    if (addedNodes.length > 0) return { args: [addedNodes] };
  },
  onNodesRemoved: ({ removedNodeIds, removedEdgeIds }) => {
    if (removedNodeIds.length > 0)
      return { args: [removedNodeIds, removedEdgeIds] };
  },
  onEdgesAdded: ({ addedEdges }) => {
    if (addedEdges.length > 0) return { args: [addedEdges] };
  },
  onEdgesRemoved: ({ removedEdgeIds }) => {
    if (removedEdgeIds.length > 0) return { args: [removedEdgeIds] };
  },
  onElementsAdded: ({ addedEdges, addedNodes }) => {
    if (hasItems(addedNodes, addedEdges)) {
      return { args: [{ addedEdges, addedNodes }] };
    }
  },
  onElementsRemoved: ({ removedEdgeIds, removedNodeIds }) => {
    if (hasItems(removedNodeIds, removedEdgeIds)) {
      return { args: [{ removedEdgeIds, removedNodeIds }] };
    }
  },
  onStructureChange: (payload) => {
    const hasStructuralChanges = hasItems(
      payload.addedNodes,
      payload.addedEdges,
      payload.removedNodeIds,
      payload.removedEdgeIds,
    );

    if (hasStructuralChanges) {
      return { args: [] };
    }
  },
};

export const propagateTransactionEvents = (
  payload: TransactionPayload,
  emit: EventHub<CoreEventMap>['emit'],
) => {
  emit('onTransactionComplete', payload);

  (Object.keys(eventNameToPredicateMap) as (keyof CoreEventMap)[]).forEach(
    (event) => {
      const predicate = eventNameToPredicateMap[event];
      if (!predicate) return;

      const result = predicate(payload);
      if (result && result.args) {
        emit(event, ...result.args);
      }
    },
  );
};
