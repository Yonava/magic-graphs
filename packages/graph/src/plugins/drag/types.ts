import { ComputedRef } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { GNode } from '../../types.ts';
import { NodeDragEventMap } from './events.ts';

type NodeDragGraph = {
  /**
   * the node that is currently being dragged or undefined if no node is being dragged
   */
  currentlyDraggingNode: ComputedRef<GNode | undefined>;
};

type NodeDragPlugin = {
  /**
   * graph node drag plugin controls
   */
  nodeDrag: NodeDragGraph;
};

export type GraphWithNodeDrag<
  TransactionWrapperOptions,
  EventMap extends BaseEventMap,
  Plugins,
> = BaseGraph<
  TransactionWrapperOptions,
  EventMap & NodeDragEventMap,
  Plugins & NodeDragPlugin
>;
