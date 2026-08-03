import { GraphPlugin } from '@graph/plugins-shared/plugins';

import { CanvasPlugin } from '../canvas/types.ts';

export type AnimationPlugin = GraphPlugin<{
  name: 'animation';
  dependsOn: [CanvasPlugin];
  controls: {
    auto: () => () => void;
  };
}>;
