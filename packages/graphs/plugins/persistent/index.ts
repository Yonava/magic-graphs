import type { BaseGraph } from '@graph/base';
import type { GraphEvent } from '@graph/events';
import type { GEdge, GNode } from '@graph/types';
import { local } from '@utils/localStorage';

export const usePersistent = (graph: BaseGraph) => {
  const canStore = (nodeOrEdge: { id: string }) => {
    const list = graph.settings.value.persistentBlacklist;
    return !list.has(nodeOrEdge.id);
  };

  const getKey = () => graph.settings.value.persistentStorageKey;

  const nodeStorage = {
    get: () => {
      const serializedNodes = local.get(`nodes-${getKey()}`) ?? '[]';
      return JSON.parse(serializedNodes);
    },
    set: (nodes: GNode[]) => {
      const serializedNodes = JSON.stringify(nodes.filter(canStore));
      local.set(`nodes-${getKey()}`, serializedNodes);
    },
  };

  const edgeStorage = {
    get: () => {
      const serializedEdges = local.get(`edges-${getKey()}`) ?? '[]';
      return JSON.parse(serializedEdges);
    },
    set: (edges: GEdge[]) => {
      const serializedEdges = JSON.stringify(edges.filter(canStore));
      local.set(`edges-${getKey()}`, serializedEdges);
    },
  };

  const trackGraphState = async () => {
    // lets all callbacks run on event bus before saving to storage
    await new Promise((res) => setTimeout(res, 10));
    nodeStorage.set(graph.nodes.value);
    edgeStorage.set(graph.edges.value);
  };

  const load = () =>
    graph.load(
      {
        nodes: nodeStorage.get(),
        edges: edgeStorage.get(),
      },
      { history: false },
    );

  const trackChangeEvents: GraphEvent[] = [
    'onStructureChange',
    'onNodeDrop',
    'onGroupDrop',
  ];

  const listenForGraphStateEvents = () => {
    trackChangeEvents.forEach((event) =>
      graph.subscribe(event, trackGraphState),
    );
  };

  const stopListeningForGraphStateEvents = () => {
    trackChangeEvents.forEach((event) =>
      graph.unsubscribe(event, trackGraphState),
    );
  };

  graph.subscribe('onSettingsChange', (diff) => {
    stopListeningForGraphStateEvents();

    // persistent was true, but now it is false
    const persistenceTurnedOff = 'persistent' in diff && !diff.persistent;
    if (persistenceTurnedOff) return;

    // persistent was false, but now it is true
    const persistenceTurnedOn = 'persistent' in diff && diff.persistent;
    if (persistenceTurnedOn) {
      load();
      listenForGraphStateEvents();

      return;
    }

    // from here on out, persistent was true, but it was not in the diff
    if ('persistentStorageKey' in diff) {
      load();
    }

    listenForGraphStateEvents();
  });

  if (graph.settings.value.persistent) {
    // ensure caller has a chance to sub to onStructureChange
    queueMicrotask(load);
    listenForGraphStateEvents();
  }

  return {
    /**
     * track the graph state on local storage
     */
    trackGraphState,
  };
};

export type GraphPersistentControls = ReturnType<typeof usePersistent>;
export type GraphPersistentPlugin = {
  /**
   * controls for persisting the graph state to local storage
   */
  persistent: GraphPersistentControls;
};
