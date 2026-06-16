import type { ComputedRef, Ref } from 'vue';

import { EventHub } from '../events/createEventHub.ts';
import { GraphSettings } from '../settings/index.ts';
import type { GEdge, GNode } from '../types.ts';
import {
  CoreTransactionWrapperOptions,
  GraphActions,
} from './actions/types.ts';
import { CoreEventMap } from './events.ts';
import { CoreGraphHelpers } from './helpers/types.ts';
import { NodePositionStoreControls } from './positions/types.ts';

export type GraphCoreControls = {
  /**
   * all the nodes contained in the graph
   */
  nodes: Ref<GNode[]>;
  /**
   * all the edges contained in the graph
   */
  edges: Ref<GEdge[]>;

  nodeIdToIndex: ComputedRef<Map<GNode['id'], number>>;
  edgeIdToIndex: ComputedRef<Map<GEdge['id'], number>>;

  getNode: (nodeId: GNode['id']) => Readonly<GNode>;
  getEdge: (edgeId: GEdge['id']) => Readonly<GEdge>;

  actions: GraphActions<CoreTransactionWrapperOptions>;

  settings: Ref<GraphSettings>;

  helpers: CoreGraphHelpers;
  positions: NodePositionStoreControls;
};

export type InternalActions = {
  [Action in keyof CoreTransactionWrapperOptions]: (
    ...args: [
      ...Parameters<GraphActions[Action]>,
      transactionOptions: Record<string, any>,
    ]
  ) => ReturnType<GraphActions[Action]>;
};
