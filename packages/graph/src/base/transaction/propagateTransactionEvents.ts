import { Emitter, GraphEvent, GraphEventMap } from '../../events/index.ts';
import { TransactionPayload } from './types.ts';

type TransactionEventPayloadResolverMap = {
  [E in GraphEvent]: (payload: TransactionPayload) => {
    args: Parameters<GraphEventMap[E]>;
  } | void;
};

type EventMapPropagationPredicates =
  Partial<TransactionEventPayloadResolverMap>;

const eventNameToPredicateMap: EventMapPropagationPredicates = {
  onNodeAdded: (payload) => {
    if (payload.addedNodes.length !== 1) return;
    return {
      args: [payload.addedNodes[0]],
    };
  },
  onNodeRemoved: (payload) => {
    if (payload.removedNodes.length !== 1) return;
    return {
      args: [payload.removedNodes[0].id, payload.removedEdges.map((e) => e.id)],
    };
  },
  onNodeUpdated: (payload) => {
    if (payload.updatedNodes.length !== 1) return;
    return {
      args: [payload.updatedNodes[0].node],
    };
  },
  onEdgeAdded: (payload) => {
    if (payload.addedEdges.length !== 1) return;
    return {
      args: [payload.addedEdges[0]],
    };
  },
  onEdgeRemoved: (payload) => {
    if (payload.removedEdges.length !== 1) return;
    return {
      args: [payload.removedEdges[0].id],
    };
  },
  onEdgeUpdated: (payload) => {
    if (payload.updatedEdges.length !== 1) return;
    return {
      args: [payload.updatedEdges[0].edge],
    };
  },
  onStructureChange: (payload) => {
    const edgeWeightChange = payload.updatedEdges.some(
      (e) => e.previousValues.weight?.valueOf() !== e.edge.weight.valueOf(),
    );
    const hasStructuralChanges =
      payload.addedNodes.length > 0 ||
      payload.removedNodes.length > 0 ||
      payload.addedEdges.length > 0 ||
      payload.removedEdges.length > 0 ||
      edgeWeightChange;

    if (hasStructuralChanges) {
      return { args: [] };
    }
  },
};

export const propagateTransactionEvents = (
  payload: TransactionPayload,
  emit: Emitter,
) => {
  (Object.keys(eventNameToPredicateMap) as GraphEvent[]).forEach((event) => {
    const predicate = eventNameToPredicateMap[event];
    if (!predicate) return;

    const result = predicate(payload);

    if (result && result.args) {
      emit(event, ...result.args);
    }
  });
};
