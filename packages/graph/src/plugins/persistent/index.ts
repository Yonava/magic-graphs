import { debounce } from '@magic/utils/debounce';
import { local } from '@magic/utils/localStorage';
import { Fraction } from 'mathjs';

import type { BaseGraph } from '../../base/index.ts';
import type { GraphEvent } from '../../events/index.ts';
import type { GEdge, GNode } from '../../types.ts';

type Serializable<T> = {
  [K in keyof T]: string;
};

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

  const serializeEdge = (edge: GEdge): Serializable<GEdge> => ({
    ...edge,
    weight: edge.weight.toString(),
  });

  const unserializeEdge = (serializedEdge: Serializable<GEdge>) => ({
    ...serializedEdge,
    weight: new Fraction(serializedEdge.weight),
  });

  const edgeStorage = {
    get: () => {
      const serializedEdges = local.get(`edges-${getKey()}`) ?? '[]';
      return (JSON.parse(serializedEdges) as Serializable<GEdge>[]).map(
        unserializeEdge,
      );
    },
    set: (edges: GEdge[]) => {
      const serializedEdges = JSON.stringify(
        edges.filter(canStore).map(serializeEdge),
      );
      local.set(`edges-${getKey()}`, serializedEdges);
    },
  };

  const trackGraphState = debounce(async () => {
    nodeStorage.set(graph.nodes.value);
    edgeStorage.set(graph.edges.value);
    // prevent lag while dragging nodes, as well as yields to all event callback before persisting
  }, 250);

  const load = () =>
    graph.load(
      {
        nodes: nodeStorage.get(),
        edges: edgeStorage.get(),
      },
      { history: false },
    );

  graph.subscribe('onSettingsChange', (diff) => {
    graph.unsubscribe('onTransactionComplete', trackGraphState);

    // persistent was true, but now it is false
    const persistenceTurnedOff = 'persistent' in diff && !diff.persistent;
    if (persistenceTurnedOff) return;

    // persistent was false, but now it is true
    const persistenceTurnedOn = 'persistent' in diff && diff.persistent;
    if (persistenceTurnedOn) {
      load();
      graph.subscribe('onTransactionComplete', trackGraphState);

      return;
    }

    // from here on out, persistent was true, but it was not in the diff
    if ('persistentStorageKey' in diff) {
      load();
    }

    graph.subscribe('onTransactionComplete', trackGraphState);
  });

  if (graph.settings.value.persistent) {
    // ensure caller has a chance to sub to onStructureChange
    queueMicrotask(load);
    graph.subscribe('onTransactionComplete', trackGraphState);
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
