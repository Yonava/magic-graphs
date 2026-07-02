import {
  GraphPlugin,
  WithLifecycle,
} from '@magic/graph-plugins-shared/plugins';

import { AnchorsPlugin } from '../anchors/types.ts';
import { CanvasPlugin } from '../canvas/types.ts';

export type InteractivePlugin = GraphPlugin<{
  name: 'interactive';
  controls: WithLifecycle<{}>;
  dependsOn: [CanvasPlugin];
  optionalDependsOn: [AnchorsPlugin];
}>;
