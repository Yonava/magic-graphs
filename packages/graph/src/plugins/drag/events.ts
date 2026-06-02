import { EventMapToEventBus } from '../../events/index.ts';
import { GNode } from '../../types.ts';

export type NodeDragEventMap = {
  /**
   * when the user initiates a drag on a node
   */
  onNodeDragStart: (node: GNode) => void;
  /**
   * when the user drops a node
   */
  onNodeDrop: (node: GNode) => void;
};

type NodeDragEventBus = EventMapToEventBus<NodeDragEventMap>;

export const createNodeDragEventBus = (): NodeDragEventBus => ({
  onNodeDragStart: new Set(),
  onNodeDrop: new Set(),
});
