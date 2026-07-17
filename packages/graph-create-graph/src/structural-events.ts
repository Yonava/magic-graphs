import { GraphActions } from '@graph/primitives/actions/types';
import { createEventHub } from '@graph/primitives/events/createEventHub';
import { EventMapToEventRegistry } from '@graph/primitives/events/types';
import {
  ElementAdditionPayload,
  ElementRemovalPayload,
  StructuralEventMap,
  TransactionPayload,
} from '@graph/primitives/transactions/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

export type { StructuralEventMap };

const createStructuralEventRegistry =
  (): EventMapToEventRegistry<StructuralEventMap> => ({
    onStructureChange: new Set(),
    onNodesAdded: new Set(),
    onNodesRemoved: new Set(),
    onEdgesAdded: new Set(),
    onEdgesRemoved: new Set(),
    onElementsAdded: new Set(),
    onElementsRemoved: new Set(),
  });

export type StructuralEventHub = ReturnType<typeof createStructuralEventHub>;

export const createStructuralEventHub = () =>
  createEventHub<StructuralEventMap>(createStructuralEventRegistry());

const hasItems = (...arrays: unknown[][]) =>
  arrays.some((arr) => arr.length > 0);

type NonStructureChangeEvent = Exclude<
  keyof StructuralEventMap,
  'onStructureChange'
>;

const eventNameToPredicateMap: {
  [EventName in NonStructureChangeEvent]: (
    payload: TransactionPayload,
  ) => { args: Parameters<StructuralEventMap[EventName]> } | void;
} = {
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
};

export const emitStructuralEvents = (
  payload: TransactionPayload,
  emit: StructuralEventHub['emit'],
) => {
  const hasStructuralChanges = hasItems(
    payload.addedNodes,
    payload.addedEdges,
    payload.removedNodeIds,
    payload.removedEdgeIds,
  );
  if (hasStructuralChanges) emit('onStructureChange');

  for (const eventName of Object.keys(
    eventNameToPredicateMap,
  ) as NonStructureChangeEvent[]) {
    const result = eventNameToPredicateMap[eventName](payload);
    if (result) emit(eventName, ...result.args);
  }
};

// each action's return value is shaped differently, so it needs its own
// mapping into the common TransactionPayload shape the predicates expect
const actionResultToPartialPayload = {
  addNode: (node: CoreNode): Partial<TransactionPayload> => ({
    addedNodes: [node],
  }),
  removeNode: (result: ElementRemovalPayload): Partial<TransactionPayload> =>
    result,
  addEdge: (edge: CoreEdge): Partial<TransactionPayload> => ({
    addedEdges: [edge],
  }),
  removeEdge: (edgeId: CoreEdge['id']): Partial<TransactionPayload> => ({
    removedEdgeIds: [edgeId],
  }),
  addElements: (result: ElementAdditionPayload): Partial<TransactionPayload> =>
    result,
  removeElements: (
    result: ElementRemovalPayload,
  ): Partial<TransactionPayload> => result,
};

// see [2] in graph-plugins-shared/plugins/internals/plugin.ts — a stable stand-in
// for "the fully-composed graph actions," safe to hand to plugins during fold and
// capture in a closure for later invocation, even though the real thing doesn't
// exist until folding (and the structural-event wrap above) finishes. every call
// dispatches through `resolve`'s argument, whatever it ends up being.
export const createFinalActionsProxy = <
  Actions extends GraphActions<any>,
>() => {
  let resolved: Actions | undefined;

  const dispatch =
    (key: keyof typeof actionResultToPartialPayload) =>
    (...args: any[]) => {
      if (!resolved) {
        throw new Error(
          `finalActions.${key} was called before graph creation finished`,
        );
      }
      return (resolved[key] as any)(...args);
    };

  const proxy = {
    addNode: dispatch('addNode'),
    removeNode: dispatch('removeNode'),
    addEdge: dispatch('addEdge'),
    removeEdge: dispatch('removeEdge'),
    addElements: dispatch('addElements'),
    removeElements: dispatch('removeElements'),
  } as Actions;

  return {
    finalActions: proxy,
    resolveFinalActions: (actions: Actions) => {
      resolved = actions;
    },
  };
};

export const wrapActionsWithStructuralEvents = <
  Actions extends GraphActions<any>,
>(
  actions: Actions,
  hub: StructuralEventHub,
): Actions => {
  const wrapped = { ...actions };

  for (const key of Object.keys(actionResultToPartialPayload) as Array<
    keyof typeof actionResultToPartialPayload
  >) {
    const action = actions[key];
    if (!action) continue;

    (wrapped as any)[key] = (...args: any[]) => {
      const result = (action as any)(...args);
      const partialPayload = (actionResultToPartialPayload[key] as any)(result);
      emitStructuralEvents(
        {
          addedNodes: [],
          addedEdges: [],
          removedNodeIds: [],
          removedEdgeIds: [],
          ...partialPayload,
        },
        hub.emit,
      );
      return result;
    };
  }

  return wrapped;
};
