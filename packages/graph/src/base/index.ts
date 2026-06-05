import { clone } from '@magic/utils/clone';
import { delta } from '@magic/utils/delta/index';

import { computed, ref, watch } from 'vue';

import { createEventHub } from '../events/createEventHub.ts';
import { DEFAULT_GRAPH_SETTINGS } from '../settings/index.ts';
import type { GraphSettings } from '../settings/index.ts';
import { getThemeResolver } from '../themes/getThemeResolver.ts';
import { THEME_LOADOUTS } from '../themes/index.ts';
import type { GraphThemeName } from '../themes/index.ts';
import { getInitialThemeMap } from '../themes/types.ts';
import type { GEdge, GNode } from '../types.ts';
import { useGraphActions } from './actions/useGraphActions.ts';
import { createBaseEventRegistry } from './events.ts';
import { useCommitTransaction } from './transaction/useCommitTransaction.ts';
import { useTransactionSucceeded } from './transaction/useTransactionSucceeded.ts';
import type { BaseGraph } from './types.ts';
import { useNodeEdgeMap } from './useNodeEdgeMap.ts';
import { usePluginHoldController } from './usePluginHold.ts';

export const useBaseGraph = (
  startupSettings: Partial<GraphSettings> = {},
): BaseGraph => {
  const themeName = ref<GraphThemeName>('light');

  const themeMap = getInitialThemeMap();
  const getTheme = getThemeResolver(themeName, themeMap);

  const settings = ref<GraphSettings>({
    ...DEFAULT_GRAPH_SETTINGS,
    ...startupSettings,
  });

  const EventRegistry = createBaseEventRegistry();
  const events = createEventHub(EventRegistry);

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

  watch(themeName, async (newThemeName, oldThemeName) => {
    events.emit('onThemeChange', newThemeName, oldThemeName);
  });

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
    /**
     * all the nodes contained in the graph
     */
    nodes,
    /**
     * all the edges contained in the graph
     */
    edges,

    nodeIdToIndex,
    edgeIdToIndex,

    getNode,
    getEdge,

    actions,

    events,

    pluginHoldController: usePluginHoldController(settings),

    baseTheme: computed(() => THEME_LOADOUTS[themeName.value]),
    themeName,
    getTheme,
    themeMap,
    settings,
  };
};
