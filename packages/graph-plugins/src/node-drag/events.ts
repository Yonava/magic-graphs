import { EventMapToEventRegistry } from '@magic/graph-core-infra/events/types';
import { CoreNode } from '@magic/graph-core-infra/types';
import { DeepReadonly } from 'ts-essentials';

export type NodeDragEventMap = {
  /**
   * when a node drag is initiated
   */
  onNodeDragStart: (nodes: DeepReadonly<CoreNode[]>) => void;
  /**
   * when a node drag is ended
   */
  onNodeDrop: (nodes: DeepReadonly<CoreNode[]>) => void;
};

type NodeDragEventRegistry = EventMapToEventRegistry<NodeDragEventMap>;

export const createNodeDragEventRegistry = (): NodeDragEventRegistry => ({
  onNodeDragStart: new Set(),
  onNodeDrop: new Set(),
});
