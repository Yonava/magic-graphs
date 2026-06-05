import { EventMapToEventRegistry } from '../../events/index.ts';
import { GNode } from '../../types.ts';
import { NodeAnchor } from './types.ts';

export type NodeAnchorEventMap = {
  /**
   * when the user initiates a drag on a node anchor
   */
  onNodeAnchorDragStart: (
    parentNode: GNode,
    nodeAnchor: Readonly<NodeAnchor>,
  ) => void;
  /**
   * when the user drops a node anchor
   */
  onNodeAnchorDrop: (
    parentNode: GNode,
    nodeAnchor: Readonly<NodeAnchor>,
  ) => void;
};

type NodeAnchorEventRegistry = EventMapToEventRegistry<NodeAnchorEventMap>;

export const createNodeAnchorEventRegistry = (): NodeAnchorEventRegistry => ({
  onNodeAnchorDragStart: new Set(),
  onNodeAnchorDrop: new Set(),
});
