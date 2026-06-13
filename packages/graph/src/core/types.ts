import type { ComputedRef, Ref } from 'vue';

import { EventHub } from '../events/createEventHub.ts';
import { GraphSettings } from '../settings/index.ts';
import type { GEdge, GNode } from '../types.ts';
import {
  CoreTransactionWrapperOptions,
  GraphActions,
  MergeTransactionWrappersWithCore,
} from './actions/types.ts';
import { CoreEventMap } from './events.ts';
import { CoreGraphHelpers } from './helpers/types.ts';
import { NodePositioningSystemControls } from './nodePositioningSystem.ts';

export type CoreGraph<
  TransactionWrapperOptions = {},
  EventMap extends CoreEventMap = CoreEventMap,
  Plugins = {},
> = {
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

  getNode: (nodeId: GNode['id']) => GNode | undefined;
  getEdge: (edgeId: GEdge['id']) => GEdge | undefined;

  actions: GraphActions<
    MergeTransactionWrappersWithCore<TransactionWrapperOptions>
  >;

  events: EventHub<EventMap>;
  settings: Ref<GraphSettings>;

  helpers: CoreGraphHelpers;
  nps: NodePositioningSystemControls;
} & Plugins;

export type InternalActions = {
  [Action in keyof CoreTransactionWrapperOptions]: (
    ...args: [
      ...Parameters<GraphActions[Action]>,
      transactionOptions: Record<string, any>,
    ]
  ) => ReturnType<GraphActions[Action]>;
};
