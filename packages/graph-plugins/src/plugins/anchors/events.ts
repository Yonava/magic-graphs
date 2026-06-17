import { EventMapToEventRegistry } from '@magic/graph/events/types';
import { GNode } from '@magic/graph/types';

import { NodeAnchor } from './types.ts';

export type AnchorsEventMap = {
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

type NodeAnchorEventRegistry = EventMapToEventRegistry<AnchorsEventMap>;

export const createNodeAnchorEventRegistry = (): NodeAnchorEventRegistry => ({
  onNodeAnchorDragStart: new Set(),
  onNodeAnchorDrop: new Set(),
});
