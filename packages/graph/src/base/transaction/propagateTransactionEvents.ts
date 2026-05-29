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
