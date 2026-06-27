import { CommitTransaction } from '@magic/graph-primitives/transactions/types';
import { CoreEdge, CoreNode } from '@magic/graph-primitives/types';

import { Ref } from 'vue';

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
