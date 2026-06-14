import { NodePositionUpdate } from '@magic/graph/core/positions/types';
import { GNode } from '@magic/graph/types';

import { NodeDepth } from '../../graph-use-node-depth/useNodeDepth.ts';
import type { Graph } from '../../useGraphWithCanvas.ts';
import { UseTreeGraphPositionerOptions } from '../useTreeGraphPositioner.ts';

export type TreeGraphPositionerOptions = {
  graph: Graph;
  rootNode: GNode;
  nodeDepths: NodeDepth;
  treeFormationOptions: UseTreeGraphPositionerOptions & {
    rootNodeCoordinates: NonNullable<UseTreeGraphPositionerOptions['rootNodeCoordinates']>;
  };
};

export type TreeGraphPositioner = (
  options: TreeGraphPositionerOptions,
) => NodePositionUpdate[];
