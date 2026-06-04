import { GNode } from '@magic/graph/types';
import type { Graph } from '../useGraphWithCanvas.ts';
import { debounce } from '@magic/utils/debounce';

import { onUnmounted, ref, watch } from 'vue';

import {
  UseTreeGraphPositionerOptions,
  useTreeGraphPositioner,
} from './useTreeGraphPositioner.ts';

type UseTreeGraphPositionerSyncOptions = UseTreeGraphPositionerOptions & {
  /**
   * debounce time in milliseconds to wait before reshaping the graph
   * @default 500 // half a second
   */
  debounceMs: number;
};

const TREE_GRAPH_POSITIONER_SYNC_DEFAULTS = {
  debounceMs: 500,
} as const;

/**
 * automatically reshapes the graph into a tree formation
 * whenever the graph structure changes
 */
export const useTreeGraphPositionerSync = (
  graph: Graph,
  options: Partial<UseTreeGraphPositionerSyncOptions> = {},
) => {
  const { debounceMs, ...treeOptions } = {
    ...TREE_GRAPH_POSITIONER_SYNC_DEFAULTS,
    ...options,
  };

  const rootNodeId = ref<GNode['id']>();
  const isActive = ref(false);

  const treeControls = useTreeGraphPositioner(graph, treeOptions);

  const updateShape = () => {
    if (!rootNodeId.value) return;
    const rootNode = graph.getNode(rootNodeId.value);
    if (!rootNode) return;
    treeControls.shapeGraph(rootNode);
  };

  const debouncedUpdateShape = debounce(updateShape, debounceMs);

  const activate = () => {
    updateShape();
    graph.events.subscribe('onStructureChange', debouncedUpdateShape);
    graph.events.subscribe('onNodeDrop', debouncedUpdateShape);
    graph.events.subscribe('onGroupDrop', debouncedUpdateShape);
    isActive.value = true;
  };

  const deactivate = () => {
    graph.events.unsubscribe('onStructureChange', debouncedUpdateShape);
    graph.events.unsubscribe('onNodeDrop', debouncedUpdateShape);
    graph.events.unsubscribe('onGroupDrop', debouncedUpdateShape);
    isActive.value = false;
  };

  // eagerly shape the graph when the root node changes
  watch(rootNodeId, () => {
    if (isActive.value) updateShape();
  });

  onUnmounted(deactivate);

  return {
    rootNodeId,
    activate,
    deactivate,
    isActive,
    updateShape,
    debouncedUpdateShape,
    ...treeControls,
  };
};

export type TreeGraphPositionerSyncControls = ReturnType<
  typeof useTreeGraphPositionerSync
>;
