import { EventMapToEventRegistry } from '@magic/graph/events/types';
import { GNode } from '@magic/graph/types';
import { DeepReadonly } from 'ts-essentials';

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
