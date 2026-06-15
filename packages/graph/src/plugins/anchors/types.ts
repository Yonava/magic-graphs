import { Ref } from 'vue';

import { CoreEventMap } from '../../core/events.ts';
import { GraphCoreControls } from '../../core/types.ts';
import { GNode, GraphPlugin } from '../../types.ts';
import { NodeAnchorEventMap } from './events.ts';

/**
 * an anchor instance that is attached to a node
 */
export type NodeAnchor = {
  /**
   * the x-coordinate of the anchor
   */
  x: number;
  /**
   * the y-coordinate of the anchor
   */
  y: number;
  /**
   * the direction of the anchor relative to the parent node.
   * ie the north anchor is the one that spawns above the node
   */
  direction: 'north' | 'east' | 'south' | 'west';
  /**
   * the unique id of the anchor
   */
  id: string;
};

type NodeAnchorGraph = {
  /**
   * the parent node of the active anchor
   */
  parentNode: Readonly<Ref<GNode | undefined>>;
  /**
   * set the parent node and spawn anchors around it
   */
  setParentNode: (nodeId: GNode['id']) => void;
  clearAnchorState: () => void;
};

export type NodeAnchorPlugin = {
  /**
   * graph node anchor plugin controls
   */
  nodeAnchor: GraphPlugin<NodeAnchorGraph>;
};

export type GraphWithNodeAnchor<
  TransactionWrapperOptions,
  EventMap extends CoreEventMap,
  Plugins,
> = GraphCoreControls<
  TransactionWrapperOptions,
  EventMap & NodeAnchorEventMap,
  Plugins & NodeAnchorPlugin
>;
