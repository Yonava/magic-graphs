import { Emitter, GraphEvent, GraphEventMap } from '../../events/index.ts';
import { TransactionPayload } from './types.ts';

type Mapped = {
  [Event in GraphEvent]: (payload: TransactionPayload) => {
    args: Parameters<GraphEventMap[Event]>;
  } | void;
};

type EventMapPropagationPredicates = Partial<Mapped>;

const predicates: EventMapPropagationPredicates = {
  onNodeAdded: (payload) => {
    if (payload.addedNodes.length === 1) {
      return {
        args: [payload.addedNodes[0]],
      };
    }
  },
};

export const propagateTransactionEvents = (
  payload: TransactionPayload,
  emit: Emitter,
) => {
  (Object.keys(predicates) as GraphEvent[]).forEach((event) => {
    const predicate = predicates[event];
    if (!predicate) return;

    const result = predicate(payload);

    if (result && result.args) {
      emit(event, ...result.args);
    }
  });
};
