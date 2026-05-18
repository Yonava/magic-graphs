import { GNode, Graph } from '@magic/graph/types';
import { Coordinate } from '@magic/shapes/types/utility';

import { NodeDepth } from '../useNodeDepth';
import { UseTreeGraphPositionerOptions } from '../useTreeGraphPositioner';

export type NodePosition = { nodeId: GNode['id']; coords: Coordinate };

export type TreeGraphPositionerOptions = {
  graph: Graph;
  rootNode: GNode;
  nodeDepths: NodeDepth;
  treeFormationOptions: UseTreeGraphPositionerOptions;
};

export type TreeGraphPositioner = (
  options: TreeGraphPositionerOptions,
) => NodePosition[];
