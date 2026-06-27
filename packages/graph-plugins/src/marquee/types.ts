import { WithTheme } from '@magic/graph-plugins-shared/types';

import { ComputedRef } from 'vue';

import {
  GraphPlugin,
  WithLifecycle,
} from '../../../graph-plugins-shared/dist/types/plugins/internals/plugin.ts';
import { CanvasPlugin } from '../canvas/types.ts';
import { FocusPlugin } from '../focus/types.ts';
import { MarqueeEventMap } from './events.ts';
import { MarqueeThemes } from './themes.ts';

type BaseMarqueeControls = {
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

export type MarqueeControls = WithTheme<BaseMarqueeControls, MarqueeThemes>;

export type MarqueePlugin = GraphPlugin<{
  controls: { marquee: WithLifecycle<MarqueeControls> };
  events: MarqueeEventMap;
  dependsOn: [CanvasPlugin, FocusPlugin];
}>;
