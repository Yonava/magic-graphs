import type { GNode, Graph } from "@magic/graph/types";
import { debounce } from "@magic/utils/debounce";

import { onUnmounted, ref, watch } from "vue";

import { binaryTreePositioner } from "./positioner/binaryTreePositioner";
import { standardTreePositioner } from "./positioner/standardTreePositioner";
import { getNodeDepths } from "./useNodeDepth";
import { Coordinate } from "@magic/shapes/types/utility";
import { TreeGraphPositionerOptions } from "./positioner/types";

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
   * the shape of the tree to form.
   * @default 'standard'
   */
  shape: "standard" | "binary";
  /**
   * the new coordinates of the root node when the graph is being re-shaped.
   * @default (rootNode) => ({ x: rootNode.x, y: rootNode.y })
   */
  rootNodeCoordinates: Coordinate | ((rootNode: GNode) => Coordinate);
};

export const TREE_FORMATION_OPTIONS_DEFAULTS = {
  durationMs: 250,
  xOffset: 250,
  yOffset: 200,
  shape: "standard",
  rootNodeCoordinates: (rootNode) => ({ x: rootNode.x, y: rootNode.y }),
} as const satisfies TreeFormationOptions;

export const useMoveNodesIntoTreeFormation = (
  graph: Graph,
  options: Partial<TreeFormationOptions> = {},
) => {
  const treeOptions: TreeFormationOptions = {
    ...TREE_FORMATION_OPTIONS_DEFAULTS,
    ...options,
  };

  const optionsRef = ref(treeOptions);

  /**
   * whether nodes of the graph are currently
   * being animated to their new positions
   */
  const reshapingActive = ref(false);

  const graphPositioner = (rootNode: GNode) => {
    const { adjacencyList } = graph.adjacencyList;
    const nodeDepths = getNodeDepths(rootNode, adjacencyList.value);
    const positionerOptions: TreeGraphPositionerOptions = {
      graph,
      nodeDepths,
      rootNode,
      treeFormationOptions: optionsRef.value,
    };
    console.log(positionerOptions.treeFormationOptions.rootNodeCoordinates);
    const positioner =
      optionsRef.value.shape === "standard"
        ? standardTreePositioner
        : binaryTreePositioner;
    return positioner(positionerOptions);
  };

  const shapeGraph = async (rootNode: GNode) => {
    if (reshapingActive.value) return;

    const newPositions = graphPositioner(rootNode);
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

  const rootNodeId = ref<GNode["id"]>();
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
    updateShape();
    graph.subscribe("onStructureChange", debouncedUpdateShape);
    graph.subscribe("onNodeDrop", debouncedUpdateShape);
    graph.subscribe("onGroupDrop", debouncedUpdateShape);
    isActive.value = true;
  };

  const deactivate = () => {
    graph.unsubscribe("onStructureChange", debouncedUpdateShape);
    graph.unsubscribe("onNodeDrop", debouncedUpdateShape);
    graph.unsubscribe("onGroupDrop", debouncedUpdateShape);
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
