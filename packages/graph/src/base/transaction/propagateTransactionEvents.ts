import { Emitter, GraphEvent, GraphEventMap } from '../../events/index.ts';
import { TransactionPayload } from './types.ts';

type TransactionEventPayloadResolverMap = {
  [E in GraphEvent]: (payload: TransactionPayload) => {
    args: Parameters<GraphEventMap[E]>;
  } | void;
};

type EventMapPropagationPredicates =
  Partial<TransactionEventPayloadResolverMap>;

const extractSingle = <T>(arr: T[]) => (arr.length === 1 ? arr[0] : undefined);
const hasItems = (...arrays: any[][]) => arrays.some((arr) => arr.length > 0);

const eventNameToPredicateMap: EventMapPropagationPredicates = {
  onNodeAdded: ({ addedNodes }) => {
    const node = extractSingle(addedNodes);
    if (node) return { args: [node] };
  },
  onNodeRemoved: ({ removedNodes, removedEdges }) => {
    const node = extractSingle(removedNodes);
    if (node) {
      return { args: [node.id, removedEdges.map((e) => e.id)] };
    }
  },
  onNodeUpdated: ({ updatedNodes }) => {
    const update = extractSingle(updatedNodes);
    if (update) return { args: [update.node] };
  },
  onEdgeAdded: ({ addedEdges }) => {
    const edge = extractSingle(addedEdges);
    if (edge) return { args: [edge] };
  },
  onEdgeRemoved: ({ removedEdges }) => {
    const edge = extractSingle(removedEdges);
    if (edge) return { args: [edge.id] };
  },
  onEdgeUpdated: ({ updatedEdges }) => {
    const update = extractSingle(updatedEdges);
    if (update) return { args: [update.edge] };
  },
  onElementsAdded: ({ addedEdges, addedNodes }) => {
    if (hasItems(addedNodes, addedEdges)) {
      return { args: [{ addedEdges, addedNodes }] };
    }
  },
  onElementsRemoved: ({ removedEdges, removedNodes }) => {
    if (hasItems(removedNodes, removedEdges)) {
      return { args: [{ removedEdges, removedNodes }] };
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
        payload.removedNodes,
        payload.removedEdges,
      );

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
