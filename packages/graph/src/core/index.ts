import { nullThrows } from '@magic/utils/assert';
import { clone } from '@magic/utils/clone';
import { delta } from '@magic/utils/delta/index';

import { computed, ref, watch } from 'vue';

import { EventHub, createEventHub } from '../events/createEventHub.ts';
import {
  ExtractActions,
  ExtractControls,
  ExtractEventMap,
  LooseGraphPlugin,
} from '../plugins/types.ts';
import { DEFAULT_GRAPH_SETTINGS } from '../settings/index.ts';
import type { GraphSettings } from '../settings/index.ts';
import type { GEdge, GNode } from '../types.ts';
import { createCoreActions } from './actions/createGraphActions.ts';
import {
  CoreTransactionWrapperOptions,
  GraphActions,
} from './actions/types.ts';
import { createCoreEventRegistry } from './events.ts';
import { useGraphHelpers } from './helpers/index.ts';
import { createNodePositionStore } from './positions/createNodePositionStore.ts';
import { useCommitTransaction } from './transaction/useCommitTransaction.ts';
import { useTransactionSucceeded } from './transaction/useTransactionSucceeded.ts';
import type { GraphCoreControls } from './types.ts';
import { useNodeEdgeMap } from './useNodeEdgeMap.ts';

export const CORE_EVENT_ID = 'core';

export const createGraph = <TPlugins extends LooseGraphPlugin[]>({
  plugins,
  settings: startupSettings = {},
}: {
  plugins: TPlugins;
  settings: Partial<GraphSettings>;
}) => {
  const settings = ref<GraphSettings>({
    ...DEFAULT_GRAPH_SETTINGS,
    ...startupSettings,
  });

  const eventRegistry = createCoreEventRegistry();
  const coreEventHub = createEventHub(eventRegistry);

  const nodes = ref<GNode[]>([]);
  const edges = ref<GEdge[]>([]);

  const nodePositionStore = createNodePositionStore(coreEventHub);

  const { nodeIdToNodeMap, edgeIdToEdgeMap } = useNodeEdgeMap(nodes, edges);
  const getNode = (id: GNode['id']) =>
    nullThrows(nodeIdToNodeMap.value.get(id), `node with id ${id} not found`);
  const getEdge = (id: GEdge['id']) =>
    nullThrows(edgeIdToEdgeMap.value.get(id), `edge with id ${id} not found`);

  const onTransactionSucceeded = useTransactionSucceeded({
    edges,
    nodes,
    emit: coreEventHub.emit,
  });

  const commitTransaction = useCommitTransaction({
    getGraph: () => ({ nodes: nodes.value, edges: edges.value }),
    onTransactionSucceeded,
  });

  const coreActions = createCoreActions({
    commitTransaction,
    graph: {
      nodes,
      edges,
      positions: nodePositionStore,
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
      coreEventHub.emit('onSettingsChange', settingsDiff);
      if ('isGraphDirected' in settingsDiff)
        coreEventHub.emit('onStructureChange');
    },
    { deep: true },
  );

  const coreControls: GraphCoreControls = {
    nodes,
    edges,
    nodeIdToIndex,
    edgeIdToIndex,
    helpers: useGraphHelpers({ edges, getEdge, getNode, settings }),
    getNode,
    getEdge,
    settings,
    positions: nodePositionStore,
  };

  const events = coreEventHub as unknown as EventHub<ExtractEventMap<TPlugins>>;

  const controls = coreControls as GraphCoreControls &
    ExtractControls<TPlugins>;

  const actions = coreActions as GraphActions<ExtractActions<TPlugins>>;

  return {
    ...controls,
    actions,
    events,
  };
};
