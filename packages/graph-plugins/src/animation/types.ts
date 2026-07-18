import { GraphPlugin } from '@graph/plugins-shared/plugins';

import { CanvasPlugin } from '../canvas/types.ts';

type AnimateOption = {
  animate?: boolean;
};

export type AnimationPlugin = GraphPlugin<{
  name: 'animation';
  dependsOn: [CanvasPlugin];
  actions: {
    addEdge: AnimateOption;
    addNode: AnimateOption;
    removeEdge: AnimateOption;
    removeNode: AnimateOption;
    addElements: {
      shared: AnimateOption;
    };
    removeElements: {
      shared: AnimateOption;
    };
  };
  controls: {
    auto: () => () => void;
  };
}>;
