import { Ref } from 'vue';

import { GEdge, GNode } from '../../types.ts';
import { NodePositioningSystemControls } from '../nodePositioningSystem.ts';
import { CommitTransaction } from '../transaction/types.ts';
import {
  createAddEdgeHandler,
  createAddElementsHandler,
  createAddNodeHandler,
  createRemoveEdgeHandler,
  createRemoveElementsHandler,
  createRemoveNodeHandler,
  createUpdateEdgeHandler,
  createUpdateElementsHandler,
  createUpdateNodeHandler,
} from './methods/index.ts';
import { GraphActions } from './types.ts';

export type GraphActionsOptions = {
  commitTransaction: CommitTransaction;
  graphState: {
    nodes: Ref<GNode[]>;
    edges: Ref<GEdge[]>;
    nps: NodePositioningSystemControls;
  };
};

export const createGraphActions = (
  options: GraphActionsOptions,
): GraphActions => ({
  addNode: createAddNodeHandler(options),
  removeNode: createRemoveNodeHandler(options),
  updateNode: createUpdateNodeHandler(options),

  addEdge: createAddEdgeHandler(options),
  removeEdge: createRemoveEdgeHandler(options),
  updateEdge: createUpdateEdgeHandler(options),

  addElements: createAddElementsHandler(options),
  removeElements: createRemoveElementsHandler(options),
  updateElements: createUpdateElementsHandler(options),
});
