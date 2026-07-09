import { CommitTransaction } from '@graph/primitives/transactions/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { NodePositionStoreControls } from '../positions/types.ts';
import type { EdgeWeightStoreControls } from '../weights/types.ts';
import {
  createAddEdgeHandler,
  createAddElementsHandler,
  createAddNodeHandler,
  createRemoveEdgeHandler,
  createRemoveElementsHandler,
  createRemoveNodeHandler,
} from './methods/index.ts';

export type CreateCoreActionOptions = {
  commitTransaction: CommitTransaction;
  graph: {
    nodes: CoreNode[];
    edges: CoreEdge[];
    positions: NodePositionStoreControls;
    weights: EdgeWeightStoreControls;
  };
};

export const createCoreActions = (options: CreateCoreActionOptions) => ({
  addNode: createAddNodeHandler(options),
  removeNode: createRemoveNodeHandler(options),

  addEdge: createAddEdgeHandler(options),
  removeEdge: createRemoveEdgeHandler(options),

  addElements: createAddElementsHandler(options),
  removeElements: createRemoveElementsHandler(options),
});
