import { GraphPlugin } from '@graph/plugins-shared/plugins';

import { CanvasPlugin } from '../canvas/types.ts';

type PhantomControls = {};

export type PhantomPlugin = GraphPlugin<{
  name: 'phantom';
  controls: PhantomControls;
  dependsOn: [CanvasPlugin];
}>;
