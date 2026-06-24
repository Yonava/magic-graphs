import { Ref } from 'vue';

import { CoreEdge, CoreNode } from '../../../../graph-core-infra/src/types.ts';
import { NodePositionStoreControls } from '../positions/types.ts';
import { CommitTransaction } from '../transaction/types.ts';
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
    nodes: Ref<CoreNode[]>;
    edges: Ref<CoreEdge[]>;
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
