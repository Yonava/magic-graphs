import { createEventHub } from '@magic/graph-primitives/events/createEventHub';
import type { CoreEdge, CoreNode } from '@magic/graph-primitives/types';
import { nullThrows } from '@magic/utils/assert';
import { clone } from '@magic/utils/clone';
import { delta } from '@magic/utils/delta/index';

import { computed, ref, watch } from 'vue';

import { createCoreActions } from './actions/createCoreActions.ts';
import { createCoreEventRegistry } from './events.ts';
import { createHelpers } from './helpers/createHelpers.ts';
import { createNodePositionStore } from './positions/createNodePositionStore.ts';
import { DEFAULT_GRAPH_SETTINGS } from './settings/index.ts';
import type { GraphSettings } from './settings/index.ts';
import { setupTransactionSucceeded } from './transaction/setupTransactionSucceeded.ts';
import { useCommitTransaction } from './transaction/useCommitTransaction.ts';
import type { CoreControls } from './types.ts';
import { useNodeEdgeMap } from './useNodeEdgeMap.ts';
import { createEdgeWeightStore } from './weights/createEdgeWeightStore.ts';

export const CORE_EVENT_ID = 'core';

export const core = ({
  settings: startupSettings = {},
}: {
  settings: Partial<GraphSettings>;
}) => {
  const settings = {
    ...DEFAULT_GRAPH_SETTINGS,
    ...startupSettings,
  };

  const eventRegistry = createCoreEventRegistry();
  const coreEventHub = createEventHub(eventRegistry);

  const nodes = ref<CoreNode[]>([]);
  const edges = ref<CoreEdge[]>([]);

  const nodePositionStore = createNodePositionStore(coreEventHub);
  const edgeWeightStore = createEdgeWeightStore(coreEventHub, settings);

  const { nodeIdToNodeMap, edgeIdToEdgeMap } = useNodeEdgeMap(nodes, edges);

  const getNode = (id: CoreNode['id']) =>
    nullThrows(nodeIdToNodeMap.value.get(id), `node with id ${id} not found`);
  const getEdge = (id: CoreEdge['id']) => {
    const edge = nullThrows(
      edgeIdToEdgeMap.value.get(id),
      `edge with id ${id} not found`,
    );
    return { ...edge, weight: edgeWeightStore.get(id) };
  };

  const coreGetters = {
    getNode,
    getEdge,
  };

  const onTransactionSucceeded = setupTransactionSucceeded({
    edges,
    nodes,
    emit: coreEventHub.emit,
  });

  const commitTransaction = useCommitTransaction({
    getGraph: () => ({ nodes, edges }),
    onTransactionSucceeded,
  });

  const coreActions = createCoreActions({
    commitTransaction,
    graph: {
      nodes,
      edges,
      positions: nodePositionStore,
      weights: edgeWeightStore,
    },
  });

  const nodeIdToIndex = computed(() =>
    nodes.value.reduce<Map<CoreNode['id'], number>>((map, node, i) => {
      map.set(node.id, i);
      return map;
    }, new Map()),
  );

  const edgeIdToIndex = computed(() =>
    edges.value.reduce<Map<CoreEdge['id'], number>>((map, edge, i) => {
      map.set(edge.id, i);
      return map;
    }, new Map()),
  );

  const coreControls: CoreControls = {
    nodes,
    edges,
    isNode: (id: string) => nodeIdToIndex.value.has(id),
    isEdge: (id: string) => edgeIdToIndex.value.has(id),
    nodeIdToIndex,
    edgeIdToIndex,
    helpers: createHelpers({ edges, getEdge, getNode, settings }),
    settings,
    positions: nodePositionStore,
    weights: edgeWeightStore,
  };

  return {
    controls: coreControls,
    actions: coreActions,
    getters: coreGetters,
    events: coreEventHub,
  };
};
