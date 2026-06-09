import { Coordinate } from '@magic/canvas/types';

import { BaseEventMap } from '../../base/events.ts';
import { BaseGraph } from '../../base/types.ts';
import { GNode, GraphPlugin } from '../../types.ts';
import { NodeDragEventMap } from './events.ts';

type NodeDragGraph = {};

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
