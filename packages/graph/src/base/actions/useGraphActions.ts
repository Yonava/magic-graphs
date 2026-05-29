import { Ref } from 'vue';

import { GEdge, GNode } from '../../types.ts';
import { CommitTransaction } from '../transaction/types.ts';
import {
  createAddEdgeHandler,
  createAddNodeHandler,
  createRemoveNodeHandler,
  createUpdateNodeHandler,
} from './methods/index.ts';
import { GraphActions } from './types.ts';

export type GraphActionsOptions = {
  commitTransaction: CommitTransaction;
  graphState: {
    nodes: Ref<GNode[]>;
    edges: Ref<GEdge[]>;
  };
};

export const useGraphActions = (
  options: GraphActionsOptions,
): GraphActions => ({
  addNode: createAddNodeHandler(options),
  removeNode: createRemoveNodeHandler(options),
  updateNode: createUpdateNodeHandler(options),

  addEdge: createAddEdgeHandler(options),
  removeEdge,
  updateEdge,

  addElements,
  removeElements,
  updateElements,
});
