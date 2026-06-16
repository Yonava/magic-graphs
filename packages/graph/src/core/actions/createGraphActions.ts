import { Ref } from 'vue';

import { GEdge, GNode } from '../../types.ts';
import { NodePositionStoreControls } from '../positions/types.ts';
import { CommitTransaction } from '../transaction/types.ts';
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
    nodes: Ref<GNode[]>;
    edges: Ref<GEdge[]>;
    positions: NodePositionStoreControls;
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
