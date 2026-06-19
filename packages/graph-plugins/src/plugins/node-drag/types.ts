import { Coordinate } from '@magic/canvas/types';
import { GraphPlugin, WithLifecycle } from '@magic/graph/plugins/types';
import { CoreNode } from '@magic/graph/types';

import { CanvasPlugin } from '../canvas/types.ts';
import { NodeDragEventMap } from './events.ts';

export type NodeIdDragState = { nodeIds: string[] };

/**
 * info for the node being dragged
 */
export type ActiveDragNode = {
  nodeId: CoreNode['id'];
  coords: Coordinate;
};

export type NodeDragPlugin = GraphPlugin<{
  controls: { nodeDrag: WithLifecycle<{}> };
  events: NodeDragEventMap;
  actions: {};
  dependsOn: [CanvasPlugin];
}>;
