import { GraphPlugin } from '@graph/plugins-shared/plugins';

import { CanvasPlugin } from '../canvas/types.ts';

export type AnimationPlugin = GraphPlugin<{
  name: 'animation';
  dependsOn: [CanvasPlugin];
  controls: {
    /**
     * opens a capture window and returns the `finalize` that closes it. prefer
     * `capture` unless the window has to span an await
     */
    auto: () => () => void;
    /**
     * animates whatever `mutate` changes, closing the capture window even if it throws
     */
    capture: <MutationResult>(mutate: () => MutationResult) => MutationResult;
  };
}>;
