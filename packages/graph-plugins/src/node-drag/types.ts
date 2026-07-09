import { Coordinate } from '@magic/canvas/types';
import {
  GraphPlugin,
  WithLifecycle,
} from '@graph/plugins-shared/plugins';
import { CoreNode } from '@graph/primitives/types';

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
  name: 'nodeDrag';
  controls: WithLifecycle<{}>;
  events: NodeDragEventMap;
  dependsOn: [CanvasPlugin];
  optionalDependsOn: [FocusPlugin, MarqueePlugin];
}>;
