import { GraphPlugin, WithLifecycle } from '@magic/graph/plugins/types';
import { CoreNode } from '@magic/graph/types';

import { Ref } from 'vue';

import { CanvasPlugin } from '../canvas/types.ts';
import { FocusPlugin } from '../focus/types.ts';
import { AnchorsEventMap } from './events.ts';

/**
 * an anchor instance that is attached to a node
 */
export type NodeAnchor = {
  /**
   * the x-coordinate of the anchor
   */
  x: number;
  /**
   * the y-coordinate of the anchor
   */
  y: number;
  /**
   * the direction of the anchor relative to the parent node.
   * ie the north anchor is the one that spawns above the node
   */
  direction: 'north' | 'east' | 'south' | 'west';
  /**
   * the unique id of the anchor
   */
  id: string;
};

type AnchorsControls = {
  /**
   * the parent node of the active anchor
   */
  parentNode: Readonly<Ref<CoreNode | undefined>>;
  /**
   * set the parent node and spawn anchors around it
   */
  setParentNode: (nodeId: CoreNode['id']) => void;
  clearAnchorState: () => void;
};

export type AnchorsPlugin = GraphPlugin<{
  controls: { anchors: WithLifecycle<AnchorsControls> };
  events: AnchorsEventMap;
  actions: {};
  dependsOn: [CanvasPlugin, FocusPlugin];
}>;
