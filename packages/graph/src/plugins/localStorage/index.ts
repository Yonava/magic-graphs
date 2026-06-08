import { debounce } from '@magic/utils/debounce';
import { local } from '@magic/utils/localStorage';
import { Fraction } from 'mathjs';

import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import type { GEdge, GNode } from '../../types.ts';
import { GraphWithLocalStorage, Serializable } from './types.ts';

export const useLocalStoragePlugin = <
  TransactionWrapperOptions,
  EventMap extends BaseEventMap,
  Plugins,
>(
  graph: BaseGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphWithLocalStorage<TransactionWrapperOptions, EventMap, Plugins> => {
  const canStore = (nodeOrEdge: { id: string }) => {
    const list = graph.settings.value.localStorageBlacklist;
    return !list.has(nodeOrEdge.id);
  };

  const getKey = () => graph.settings.value.localStorageKey;

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

  const save = debounce(async () => {
    nodeStorage.set(graph.nodes.value);
    edgeStorage.set(graph.edges.value);
    // prevent lag while dragging nodes, as well as yields to all event callback before persisting
  }, 250);

  const load = () => {
    graph.actions.removeElements({
      nodeIds: graph.nodes.value.map((n) => n.id),
    });
    graph.actions.addElements({
      nodes: nodeStorage.get(),
      edges: edgeStorage.get(),
    });
  };

  graph.events.subscribe('onSettingsChange', (diff) => {
    graph.events.unsubscribe('onTransactionComplete', save);

    // localStorage was true, but now it is false
    const persistenceTurnedOff = 'localStorage' in diff && !diff.localStorage;
    if (persistenceTurnedOff) return;

    // localStorage was false, but now it is true
    const persistenceTurnedOn = 'localStorage' in diff && diff.localStorage;
    if (persistenceTurnedOn) {
      load();
      graph.events.subscribe('onTransactionComplete', save);

      return;
    }

    // from here on out, localStorage was true, but it was not in the diff
    if ('localStorageKey' in diff) {
      load();
    }

    graph.events.subscribe('onTransactionComplete', save);
  });

  graph.events.subscribe('onTransactionComplete', save);

  return {
    ...graph,
    localStorage: {
      save,
    },
  };
};
