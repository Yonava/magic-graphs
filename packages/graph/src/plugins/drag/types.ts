import { Coordinate } from '@magic/canvas/types';

import { ComputedRef } from 'vue';

import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { GNode, GraphPlugin } from '../../types.ts';
import { NodeDragEventMap } from './events.ts';

type NodeDragGraph = {
  /**
   * the node that is currently being dragged or undefined if no node is being dragged
   */
  currentlyDraggingNode: ComputedRef<GNode | undefined>;
};

/**
 * info for the node being dragged
 */
export type ActiveDragNode = {
  nodeId: GNode['id'];
  coords: Coordinate;
};

export type NodeDragPlugin = {
  /**
   * graph node drag plugin controls
   */
  nodeDrag: GraphPlugin<NodeDragGraph>;
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
