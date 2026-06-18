import type { ComputedRef, Ref } from 'vue';

import { GraphSettings } from '../settings/index.ts';
import type { CodeEdge, CoreNode } from '../types.ts';
import { CoreGraphHelpers } from './helpers/types.ts';
import { NodePositionStoreControls } from './positions/types.ts';

export type CoreControls = {
  /**
   * all the nodes contained in the graph
   */
  nodes: Ref<CoreNode[]>;
  /**
   * all the edges contained in the graph
   */
  edges: Ref<CodeEdge[]>;

  nodeIdToIndex: ComputedRef<Map<CoreNode['id'], number>>;
  edgeIdToIndex: ComputedRef<Map<CodeEdge['id'], number>>;

  settings: Ref<GraphSettings>;

  helpers: CoreGraphHelpers;
  positions: NodePositionStoreControls;
};
