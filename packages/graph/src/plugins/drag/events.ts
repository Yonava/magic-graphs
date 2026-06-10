import { DeepReadonly } from 'ts-essentials';

import { EventMapToEventRegistry } from '../../events/types.ts';
import { GNode } from '../../types.ts';

export type NodeDragEventMap = {
  /**
   * when the user initiates a node drag
   */
  onNodeDragStart: (nodes: DeepReadonly<GNode[]>) => void;
  /**
   * when the user drops nodes
   */
  onNodeDrop: (nodes: DeepReadonly<GNode[]>) => void;
};

type NodeDragEventRegistry = EventMapToEventRegistry<NodeDragEventMap>;

export const createNodeDragEventRegistry = (): NodeDragEventRegistry => ({
  onNodeDragStart: new Set(),
  onNodeDrop: new Set(),
});
