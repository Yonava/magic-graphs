import { GraphPlugin, WithLifecycle } from '@magic/graph/plugins/types';

import { ComputedRef } from 'vue';

import { CanvasPlugin } from '../canvas/types.ts';
import { FocusPlugin } from '../focus/types.ts';
import { MarqueeEventMap } from './events.ts';

export type MarqueeControls = {
  /**
   * updates the bounding box around the nodes that are currently focused.
   * use this when you are changing theme or position outside of the standard supported use cases
   */
  updateEncapsulatedNodeBox: () => void;
  /**
   * true when the marquee box is being actively sized by user
   */
  activelySelecting: ComputedRef<boolean>;
};

export type MarqueePlugin = GraphPlugin<{
  controls: { marquee: WithLifecycle<MarqueeControls> };
  events: MarqueeEventMap;
  actions: {};
  dependsOn: [CanvasPlugin, FocusPlugin];
}>;
