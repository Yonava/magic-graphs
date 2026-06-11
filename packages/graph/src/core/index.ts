import { clone } from '@magic/utils/clone';
import { delta } from '@magic/utils/delta/index';

import { computed, ref, watch } from 'vue';

import { createEventHub } from '../events/createEventHub.ts';
import { DEFAULT_GRAPH_SETTINGS } from '../settings/index.ts';
import type { GraphSettings } from '../settings/index.ts';
import type { GEdge, GNode } from '../types.ts';
import { useGraphActions } from './actions/useGraphActions.ts';
import { createCoreEventRegistry } from './events.ts';
import { useGraphHelpers } from './helpers/index.ts';
import { useCommitTransaction } from './transaction/useCommitTransaction.ts';
import { useTransactionSucceeded } from './transaction/useTransactionSucceeded.ts';
import type { CoreGraph } from './types.ts';
import { useNodeEdgeMap } from './useNodeEdgeMap.ts';

export const CORE_EVENT_ID = 'core';

export const useCoreGraph = (
  startupSettings: Partial<GraphSettings> = {},
): CoreGraph => {
  const settings = ref<GraphSettings>({
    ...DEFAULT_GRAPH_SETTINGS,
    ...startupSettings,
  });

  const eventRegistry = createCoreEventRegistry();
  const events = createEventHub(eventRegistry);

  const nodes = ref<GNode[]>([]);
  const edges = ref<GEdge[]>([]);
  const { nodeIdToNodeMap, edgeIdToEdgeMap } = useNodeEdgeMap(nodes, edges);
  const getNode = (id: GNode['id']) => nodeIdToNodeMap.value.get(id);
  const getEdge = (id: GEdge['id']) => edgeIdToEdgeMap.value.get(id);

  const onTransactionSucceeded = useTransactionSucceeded({
    edges,
    nodes,
    emit: events.emit,
  });
  const commitTransaction = useCommitTransaction({
    getGraphState: () => ({ nodes: nodes.value, edges: edges.value }),
    onTransactionSucceeded,
  });

  const actions = useGraphActions({
    commitTransaction,
    graphState: {
      nodes,
      edges,
    },
  });

  const nodeIdToIndex = computed(() =>
    nodes.value.reduce<Map<GNode['id'], number>>((map, node, i) => {
      map.set(node.id, i);
      return map;
    }, new Map()),
  );

  const edgeIdToIndex = computed(() =>
    edges.value.reduce<Map<GEdge['id'], number>>((map, edge, i) => {
      map.set(edge.id, i);
      return map;
    }, new Map()),
  );

  const activeSettings = ref(clone(settings.value));
  watch(
    settings,
    (newSettings) => {
      const settingsDiff = delta(activeSettings.value, newSettings);
      if (!settingsDiff) return;
      activeSettings.value = clone(settings.value);
      events.emit('onSettingsChange', settingsDiff);
      if ('isGraphDirected' in settingsDiff) events.emit('onStructureChange');
    },
    { deep: true },
  );

  return {
    nodes,
    edges,

    nodeIdToIndex,
    edgeIdToIndex,

    helpers: useGraphHelpers({ edges, getEdge, getNode, settings }),

    getNode,
    getEdge,

    actions,
    events,

    settings,
  };
};
