import type { ComputedRef, Ref } from 'vue';

import type {
  CoreEdge,
  CoreNode,
} from '../../../graph-core-infra/src/types.ts';
import { GraphSettings } from '../settings/index.ts';
import { CoreGraphHelpers } from './helpers/types.ts';
import { NodePositionStoreControls } from './positions/types.ts';
import { EdgeWeightStoreControls } from './weights/types.ts';

export type CoreControls = {
  nodes: Ref<CoreNode[]>;
  edges: Ref<CoreEdge[]>;

  isNode: (id: string) => boolean;
  isEdge: (id: string) => boolean;

  nodeIdToIndex: ComputedRef<Map<CoreNode['id'], number>>;
  edgeIdToIndex: ComputedRef<Map<CoreEdge['id'], number>>;

  settings: Ref<GraphSettings>;

  helpers: CoreGraphHelpers;
  positions: NodePositionStoreControls;
  weights: EdgeWeightStoreControls;
};
