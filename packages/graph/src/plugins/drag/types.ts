import { Coordinate } from '@magic/canvas/types';

import { CoreEventMap } from '../../core/events.ts';
import { CoreGraph } from '../../core/types.ts';
import { GNode, GraphPlugin } from '../../types.ts';
import { NodeDragEventMap } from './events.ts';

type NodeDragGraph = {};

export type NodeIdDragState = { nodeIds: string[] };

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
  EventMap extends CoreEventMap,
  Plugins,
> = CoreGraph<
  TransactionWrapperOptions,
  EventMap & NodeDragEventMap,
  Plugins & NodeDragPlugin
>;
