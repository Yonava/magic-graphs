import { NodePositionUpdate } from '@magic/graph/core/positions/types';

import { NodeDepth } from '../../graph-use-node-depth/useNodeDepth.ts';
import type { Graph } from '../../useGraphWithCanvas.ts';
import { UseTreeGraphPositionerOptions } from '../useTreeGraphPositioner.ts';

export type TreeGraphPositionerOptions = {
  graph: Graph;
  rootNode: { id: string };
  nodeDepths: NodeDepth;
  treeFormationOptions: UseTreeGraphPositionerOptions & {
    rootNodeCoordinates: NonNullable<UseTreeGraphPositionerOptions['rootNodeCoordinates']>;
  };
};

export type TreeGraphPositioner = (
  options: TreeGraphPositionerOptions,
) => NodePositionUpdate[];
