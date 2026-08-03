import { Coordinate } from '@canvas/primitives/types/utility';
import { GraphPlugin } from '@graph/plugins-shared/plugins';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { CanvasPlugin } from '../canvas/types.ts';
import { FocusPlugin } from '../focus/types.ts';

export type PhantomControls = {
  /** adds a node the graph draws but does not contain */
  addNode: (node: PhantomNode) => void;
  /** adds an edge the graph draws but does not contain */
  addEdge: (edge: PhantomEdge) => void;
  /** the phantom nodes only, the graph's own nodes are not included */
  nodes: () => readonly PhantomNode[];
  /** the phantom edges only, the graph's own edges are not included */
  edges: () => readonly PhantomEdge[];
  /** position of any node the graph draws, phantom or real */
  getNodePosition: (nodeId: CoreNode['id']) => Readonly<Coordinate>;
};

export type PhantomNode = CoreNode & {
  position: Coordinate;
  label: string;
};

export type PhantomEdge = CoreEdge & {
  label?: string;
};

export type PhantomPlugin = GraphPlugin<{
  name: 'phantom';
  controls: PhantomControls;
  dependsOn: [CanvasPlugin];
  optionalDependsOn: [FocusPlugin];
}>;
