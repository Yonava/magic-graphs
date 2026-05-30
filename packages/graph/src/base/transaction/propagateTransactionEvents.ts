import { BaseGraphEventMap } from '../events.ts';
import { BaseGraph } from '../types.ts';
import { TransactionPayload } from './types.ts';

type TransactionEventPayloadResolverMap = {
  [EventName in keyof BaseGraphEventMap]: (payload: TransactionPayload) => {
    args: Parameters<BaseGraphEventMap[EventName]>;
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
  onNodeRemoved: ({ removedNodeIds, removedEdgeIds }) => {
    const nodeId = extractSingle(removedNodeIds);
    if (nodeId) {
      return { args: [nodeId, removedEdgeIds] };
    }
  },
  onNodeUpdated: ({ updatedNodes }) => {
    const update = extractSingle(updatedNodes);
    if (update) return { args: [update.node, update.previousValues] };
  },
  onEdgeAdded: ({ addedEdges }) => {
    const edge = extractSingle(addedEdges);
    if (edge) return { args: [edge] };
  },
  onEdgeRemoved: ({ removedEdgeIds }) => {
    const edgeId = extractSingle(removedEdgeIds);
    if (edgeId) return { args: [edgeId] };
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
  events: BaseGraph['events'],
) => {
  (Object.keys(eventNameToPredicateMap) as (keyof BaseGraphEventMap)[]).forEach(
    (event) => {
      const predicate = eventNameToPredicateMap[event];
      if (!predicate) return;

      const result = predicate(payload);
      if (result && result.args) {
        events.emit(event, ...result.args);
      }
    },
  );
};
