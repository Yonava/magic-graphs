import { Coordinate } from '@canvas/primitives/types/utility';
import { GraphPlugin } from '@graph/plugins-shared/plugins';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { CanvasPlugin } from '../canvas/types.ts';
import { FocusPlugin } from '../focus/types.ts';

type PhantomControls = {};

export type PhantomNode = CoreNode & {
  position: Coordinate;
  label: string;
};

export type PhantomEdge = CoreEdge;

export type PhantomPlugin = GraphPlugin<{
  name: 'phantom';
  controls: PhantomControls;
  dependsOn: [CanvasPlugin];
  optionalDependsOn: [FocusPlugin];
}>;
