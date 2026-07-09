import { Coordinate } from '@magic/shapes/types/utility';

import { ref } from 'vue';

import { getNodeDepths } from '../graph-use-node-depth/useNodeDepth.ts';
import type { Graph } from '../useGraphWithCanvas.ts';
import { binaryTreePositioner } from './positioners/binaryTreePositioner.ts';
import { standardTreePositioner } from './positioners/standardTreePositioner.ts';
import { TreeGraphPositionerOptions } from './positioners/types.ts';

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
   * @default the root node's current position
   */
  rootNodeCoordinates?: Coordinate;
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

  const graphPositioner = (rootNode: { id: string }) => {
    const { standard: adjacencyList } = graph.adjacencyLists;
    const nodeDepths = getNodeDepths(rootNode, adjacencyList.value);
    const positionerOptions: TreeGraphPositionerOptions = {
      graph,
      nodeDepths,
      rootNode,
      treeFormationOptions: {
        ...optionsRef.value,
        rootNodeCoordinates:
          optionsRef.value.rootNodeCoordinates ??
          graph.positions.get(rootNode.id),
      },
    };
    const positioner =
      optionsRef.value.shape === 'standard'
        ? standardTreePositioner
        : binaryTreePositioner;
    return positioner(positionerOptions);
  };

  const shapeGraph = async (rootNode: { id: string }) => {
    const newPositions = graphPositioner(rootNode);
    if (!newPositions) return;
    graph.positions.setMany(newPositions);
  };

  return {
    shapeGraph,
    options: optionsRef,
  };
};

export type TreeGraphPositionerControls = ReturnType<
  typeof useTreeGraphPositioner
>;
