import {
  GraphPlugin,
  WithLifecycle,
  WithTheme,
} from '@graph/plugins-shared/plugins';

import { CanvasPlugin } from '../canvas/types.ts';
import { FocusPlugin } from '../focus/types.ts';
import { MarqueeEventMap } from './events.ts';
import { MarqueeThemes } from './themes.ts';

export type MarqueeControls = WithTheme<{}, MarqueeThemes>;

export type MarqueePlugin = GraphPlugin<{
  name: 'marquee';
  controls: WithLifecycle<MarqueeControls>;
  events: MarqueeEventMap;
  dependsOn: [CanvasPlugin, FocusPlugin];
}>;
