import { CoreEventMap } from '../events.ts';
import { CoreGraph } from '../types.ts';
import { TransactionPayload } from './types.ts';

type TransactionEventPayloadResolverMap = {
  [EventName in keyof CoreEventMap]: (payload: TransactionPayload) => {
    args: Parameters<CoreEventMap[EventName]>;
  } | void;
};

type EventMapPropagationPredicates =
  Partial<TransactionEventPayloadResolverMap>;

const extractSingle = <T>(arr: T[]) => (arr.length === 1 ? arr[0] : undefined);
const hasItems = (...arrays: any[][]) => arrays.some((arr) => arr.length > 0);

const eventNameToPredicateMap: EventMapPropagationPredicates = {
  onNodesAdded: ({ addedNodes }) => {
    if (addedNodes.length > 0) return { args: [addedNodes] };
  },
  onNodesRemoved: ({ removedNodeIds, removedEdgeIds }) => {
    if (removedNodeIds.length > 0) return { args: [removedNodeIds, removedEdgeIds] };
  },
  onNodeUpdated: ({ updatedNodes }) => {
    const update = extractSingle(updatedNodes);
    if (update) return { args: [update.node, update.previousValues] };
  },
  onEdgesAdded: ({ addedEdges }) => {
    if (addedEdges.length > 0) return { args: [addedEdges] };
  },
  onEdgesRemoved: ({ removedEdgeIds }) => {
    if (removedEdgeIds.length > 0) return { args: [removedEdgeIds] };
  },
  onEdgeUpdated: ({ updatedEdges }) => {
    const update = extractSingle(updatedEdges);
    if (update) return { args: [update.edge, update.previousValues] };
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
  onElementsUpdated: ({ updatedEdges, updatedNodes }) => {
    if (hasItems(updatedNodes, updatedEdges)) {
      return { args: [{ updatedEdges, updatedNodes }] };
    }
  },
  onStructureChange: (payload) => {
    const edgeWeightChanged = payload.updatedEdges.some(
      (e) => e.previousValues.weight?.valueOf() !== e.edge.weight.valueOf(),
    );

    const hasStructuralChanges =
      edgeWeightChanged ||
      hasItems(
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
  emit: CoreGraph['events']['emit'],
) => {
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
  emit('onTransactionComplete', payload);
};
