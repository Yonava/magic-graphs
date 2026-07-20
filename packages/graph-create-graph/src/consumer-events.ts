import {
  ConsumerEventMap,
  GettersInvalidationEventMap,
} from '@graph/core/consumer-events';
import {
  EdgeWeightEntry,
  EdgeWeightStoreControls,
} from '@graph/core/weights/types';
import { GraphActions } from '@graph/primitives/actions/types';
import { createEventHub } from '@graph/primitives/events/createEventHub';
import { EventMapToEventRegistry } from '@graph/primitives/events/types';
import {
  ElementAdditionPayload,
  ElementRemovalPayload,
  TransactionPayload,
} from '@graph/primitives/transactions/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

export type { ConsumerEventMap };

const createConsumerEventRegistry =
  (): EventMapToEventRegistry<ConsumerEventMap> => ({
    onStructureChange: new Set(),
    onNodesAdded: new Set(),
    onNodesRemoved: new Set(),
    onEdgesAdded: new Set(),
    onEdgesRemoved: new Set(),
    onElementsAdded: new Set(),
    onElementsRemoved: new Set(),
    onEdgeWeightsChanged: new Set(),
  });

export type ConsumerEventHub = ReturnType<typeof createConsumerEventHub>;

export const createConsumerEventHub = () =>
  createEventHub<ConsumerEventMap>(createConsumerEventRegistry());

// kept off ConsumerEventMap on purpose — see GettersInvalidationEventMap in
// @graph/core/consumer-events. its own tiny hub, exposed only under
// events._internal.gettersInvalidation.
export type GettersInvalidationEventHub = ReturnType<
  typeof createGettersInvalidationEventHub
>;

export const createGettersInvalidationEventHub = () =>
  createEventHub<GettersInvalidationEventMap>({
    onGettersInvalidated: new Set(),
  });

const hasItems = (...arrays: unknown[][]) =>
  arrays.some((arr) => arr.length > 0);

// onEdgeWeightsChanged is derived by wrapWeightsControlsWithConsumerEvents, not
// from a TransactionPayload — weight sets aren't one of the wrapped actions above.
type NonStructureChangeEvent = Exclude<
  keyof ConsumerEventMap,
  'onStructureChange' | 'onEdgeWeightsChanged'
>;

const eventNameToPredicateMap: {
  [EventName in NonStructureChangeEvent]: (
    payload: TransactionPayload,
  ) => { args: Parameters<ConsumerEventMap[EventName]> } | void;
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

export const emitConsumerEvents = (
  payload: TransactionPayload,
  emit: ConsumerEventHub['emit'],
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
// exist until folding (and the consumer-event wrap above) finishes. every call
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

export const wrapActionsWithConsumerEvents = <
  Actions extends GraphActions<any>,
>(
  actions: Actions,
  hub: ConsumerEventHub,
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
      emitConsumerEvents(
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

// weight changes don't go through an action (no addNode/removeNode-style call for
// setting a weight), so they can't be picked up by wrapActionsWithConsumerEvents.
// create-graph gets the same derivation authority here by wrapping the weight
// controls themselves — never by subscribing to core's own event hub.
export const wrapWeightsControlsWithConsumerEvents = (
  weights: EdgeWeightStoreControls,
  hub: ConsumerEventHub,
): EdgeWeightStoreControls => {
  const emitChange = (entries: EdgeWeightEntry[]) => {
    hub.emit('onEdgeWeightsChanged', entries);
    hub.emit('onStructureChange');
  };

  return {
    ...weights,
    set: (update) => {
      const entry = weights.set(update);
      emitChange([entry]);
      return entry;
    },
    setMany: (updates) => {
      const entries = weights.setMany(updates);
      emitChange(entries);
      return entries;
    },
  };
};
