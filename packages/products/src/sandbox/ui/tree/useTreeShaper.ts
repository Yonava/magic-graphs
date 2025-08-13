import type { GNode, Graph } from '@magic/graph/types';
import { debounce } from '@utils/debounce';

import { onUnmounted, ref, watch } from 'vue';

import { getTreeBinaryPos } from './getTreeBinaryPos';
import { getTreeStandardPos } from './getTreeStandardPos';
import { getNodeDepths } from './useNodeDepth';

export type TreeFormationOptions = {
  /**
   * the duration of the animation in milliseconds.
   * must be greater than 100
   * @default 250
   */
  durationMs: number;
  /**
   * the horizontal offset between nodes at the same depth.
   * @default 250
   */
  xOffset: number;
  /**
   * the vertical offset between nodes at different depths.
   * @default 200
   */
  yOffset: number;
  /**
   * the shape of the tree to form
   * @default 'standard'
   */
  shape: 'standard' | 'binary';
};

export const TREE_FORMATION_OPTIONS_DEFAULTS = {
  durationMs: 250,
  xOffset: 250,
  yOffset: 200,
  shape: 'standard',
} as const;

export const useMoveNodesIntoTreeFormation = (
  graph: Graph,
  options: Partial<TreeFormationOptions> = {},
) => {
  const treeOptions = {
    ...TREE_FORMATION_OPTIONS_DEFAULTS,
    ...options,
  };

  const optionsRef = ref(treeOptions);

  /**
   * whether nodes of the graph are currently
   * being animated to their new positions
   */
  const reshapingActive = ref(false);

  const getNewNodePositions = (rootNode: GNode) => {
    const { adjacencyList } = graph.adjacencyList;
    const nodeDepths = getNodeDepths(rootNode, adjacencyList.value);
    const getPositions =
      optionsRef.value.shape === 'standard'
        ? getTreeStandardPos
        : getTreeBinaryPos;
    return getPositions(graph, rootNode, nodeDepths, optionsRef.value);
  };

  const shapeGraph = async (rootNode: GNode) => {
    if (reshapingActive.value) return;

    const newPositions = getNewNodePositions(rootNode);
    if (!newPositions) return;

    reshapingActive.value = true;
    await graph.bulkMoveNode(newPositions);
    reshapingActive.value = false;
  };

  return {
    shapeGraph,
    reshapingActive,
    options: optionsRef,
  };
};

export type AutoTreeOptions = TreeFormationOptions & {
  /**
   * debounce time in milliseconds to wait before reshaping the graph
   * @default 500 // half a second
   */
  debounceMs: number;
};

export const AUTO_TREE_OPTIONS_DEFAULTS = {
  debounceMs: 500,
} as const;

/**
 * automatically reshapes the graph into a tree formation
 * whenever the graph structure changes
 */
export const useAutoTree = (
  graph: Graph,
  options: Partial<AutoTreeOptions> = {},
) => {
  const { debounceMs, ...treeOptions } = {
    ...AUTO_TREE_OPTIONS_DEFAULTS,
    ...options,
  };

  const rootNodeId = ref<GNode['id']>();
  const isActive = ref(false);

  const treeControls = useMoveNodesIntoTreeFormation(graph, treeOptions);

  const updateShape = () => {
    if (!rootNodeId.value) return;
    const rootNode = graph.getNode(rootNodeId.value);
    if (!rootNode) return;
    treeControls.shapeGraph(rootNode);
  };

  const debouncedUpdateShape = debounce(updateShape, debounceMs);

  const activate = () => {
    graph.subscribe('onStructureChange', debouncedUpdateShape);
    graph.subscribe('onNodeDrop', debouncedUpdateShape);
    graph.subscribe('onGroupDrop', debouncedUpdateShape);
    isActive.value = true;
  };

  const deactivate = () => {
    graph.unsubscribe('onStructureChange', debouncedUpdateShape);
    graph.unsubscribe('onNodeDrop', debouncedUpdateShape);
    graph.unsubscribe('onGroupDrop', debouncedUpdateShape);
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

export type AutoTreeControls = ReturnType<typeof useAutoTree>;
