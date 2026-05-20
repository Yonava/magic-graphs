import type { GNode, Graph } from '@magic/graph/types';
import { Coordinate } from '@magic/shapes/types/utility';

import { ref } from 'vue';

import { getNodeDepths } from '../graph-use-node-depth/useNodeDepth';
import { binaryTreePositioner } from './positioners/binaryTreePositioner';
import { standardTreePositioner } from './positioners/standardTreePositioner';
import { TreeGraphPositionerOptions } from './positioners/types';

type TreeShape = 'standard' | 'binary';

export type UseTreeGraphPositionerOptions = {
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
  shape: TreeShape;
  /**
   * the new coordinates of the root node when the graph is being re-shaped.
   * @default (rootNode) => ({ x: rootNode.x, y: rootNode.y })
   */
  rootNodeCoordinates: Coordinate | ((rootNode: GNode) => Coordinate);
  /**
   * if `true`, nodes and edges animate into place
   * @default false
   */
  animate: boolean;
};

export const TREE_FORMATION_OPTIONS_DEFAULTS = {
  xOffset: 250,
  yOffset: 200,
  shape: 'standard',
  animate: false,
  rootNodeCoordinates: (rootNode) => ({ x: rootNode.x, y: rootNode.y }),
} as const satisfies UseTreeGraphPositionerOptions;

export const useTreeGraphPositioner = (
  graph: Graph,
  options: Partial<UseTreeGraphPositionerOptions> = {},
) => {
  const treeOptions: UseTreeGraphPositionerOptions = {
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
    const positioner =
      optionsRef.value.shape === 'standard'
        ? standardTreePositioner
        : binaryTreePositioner;
    return positioner(positionerOptions);
  };

  const shapeGraph = async (rootNode: GNode) => {
    if (reshapingActive.value) return;

    const newPositions = graphPositioner(rootNode);
    if (!newPositions) return;

    reshapingActive.value = true;
    await graph.bulkMoveNode(newPositions, { animate: treeOptions.animate });
    reshapingActive.value = false;
  };

  return {
    shapeGraph,
    reshapingActive,
    options: optionsRef,
  };
};

export type TreeGraphPositionerControls = ReturnType<
  typeof useTreeGraphPositioner
>;
