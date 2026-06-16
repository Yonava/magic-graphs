import type { ComputedRef, Ref } from 'vue';

import { GraphSettings } from '../settings/index.ts';
import type { GEdge, GNode } from '../types.ts';
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

  settings: Ref<GraphSettings>;

  helpers: CoreGraphHelpers;
  positions: NodePositionStoreControls;
};
