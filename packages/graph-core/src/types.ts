import { CoreEdge, CoreNode } from '@magic/graph-primitives/types';

import type { ComputedRef, Ref } from 'vue';

import { CoreGraphHelpers } from './helpers/types.ts';
import { CoreOptions } from './options.ts';
import { NodePositionStoreControls } from './positions/types.ts';
import { EdgeWeightStoreControls } from './weights/types.ts';

export type CoreControls = {
  nodes: Ref<CoreNode[]>;
  edges: Ref<CoreEdge[]>;

  isNode: (id: string) => boolean;
  isEdge: (id: string) => boolean;

  nodeIdToIndex: ComputedRef<Map<CoreNode['id'], number>>;
  edgeIdToIndex: ComputedRef<Map<CoreEdge['id'], number>>;

  options: CoreOptions;

  helpers: CoreGraphHelpers;
  positions: NodePositionStoreControls;
  weights: EdgeWeightStoreControls;
};
