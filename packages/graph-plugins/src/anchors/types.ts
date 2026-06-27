import { WithTheme } from '@magic/graph-plugins-shared/types';
import { CoreNode } from '@magic/graph-primitives/types';

import { Ref } from 'vue';

import {
  GraphPlugin,
  WithLifecycle,
} from '../../../graph-plugins-shared/dist/types/plugins/internals/plugin.ts';
import { CanvasPlugin } from '../canvas/types.ts';
import { FocusPlugin } from '../focus/types.ts';
import { AnchorsEventMap } from './events.ts';
import { AnchorsThemes } from './themes.ts';

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

type BaseAnchorsControls = {
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

export type AnchorsControls = WithTheme<BaseAnchorsControls, AnchorsThemes>;

export type AnchorsPlugin = GraphPlugin<{
  controls: { anchors: WithLifecycle<AnchorsControls> };
  events: AnchorsEventMap;
  dependsOn: [CanvasPlugin];
  optionalDependsOn: [FocusPlugin];
}>;
