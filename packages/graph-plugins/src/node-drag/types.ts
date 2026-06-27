import { Coordinate } from '@magic/canvas/types';
import { CoreNode } from '@magic/graph-primitives/types';
import {
  GraphPlugin,
  WithLifecycle,
} from '@magic/graph-plugins-shared/plugins/types';

import { CanvasPlugin } from '../canvas/types.ts';
import { FocusPlugin } from '../focus/types.ts';
import { MarqueePlugin } from '../marquee/types.ts';
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
  dependsOn: [CanvasPlugin];
  optionalDependsOn: [FocusPlugin, MarqueePlugin];
}>;
