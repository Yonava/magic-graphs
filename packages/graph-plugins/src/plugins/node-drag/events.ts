import { EventMapToEventRegistry } from '@magic/graph/events/types';
import { GNode } from '@magic/graph/types';
import { DeepReadonly } from 'ts-essentials';

export type NodeDragEventMap = {
  /**
   * when a node drag is initiated
   */
  onNodeDragStart: (nodes: DeepReadonly<GNode[]>) => void;
  /**
   * when a node drag is ended
   */
  onNodeDrop: (nodes: DeepReadonly<GNode[]>) => void;
};

type NodeDragEventRegistry = EventMapToEventRegistry<NodeDragEventMap>;

export const createNodeDragEventRegistry = (): NodeDragEventRegistry => ({
  onNodeDragStart: new Set(),
  onNodeDrop: new Set(),
});
