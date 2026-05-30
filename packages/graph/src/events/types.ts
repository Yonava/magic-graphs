import type { BoundingBox, Coordinate } from '@magic/shapes/types/utility';
import type { DeepReadonly } from 'ts-essentials';

import type { NodeAnchor } from '../plugins/anchors/types.ts';
import type {
  HistoryRecord,
  RedoHistoryOptions,
  UndoHistoryOptions,
} from '../plugins/history/types.ts';
import type { GNode } from '../types.ts';

export type HistoryGraphEventMap = {
  /**
   * when the undo action is triggered
   */
  onUndo: (
    historyRecord: DeepReadonly<HistoryRecord>,
    options: DeepReadonly<UndoHistoryOptions>,
  ) => void;
  /**
   * when the redo action is triggered
   */
  onRedo: (
    historyRecord: DeepReadonly<HistoryRecord>,
    options: DeepReadonly<RedoHistoryOptions>,
  ) => void;
};

export type DraggableGraphEventMap = {
  /**
   * when the user initiates a drag on a node
   */
  onNodeDragStart: (node: GNode) => void;
  /**
   * when the user drops a node
   */
  onNodeDrop: (node: GNode) => void;
};

export type NodeAnchorGraphEventMap = {
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

export type MarqueeGraphEventMap = {
  /**
   * when the user starts a marquee drag
   */
  onGroupDragStart: (
    nodes: Readonly<GNode[]>,
    startingCoordinates: Readonly<Coordinate>,
  ) => void;
  /**
   * when the user drops a marquee drag
   */
  onGroupDrop: (
    nodes: Readonly<GNode[]>,
    endCoordinates: Readonly<Coordinate>,
  ) => void;
  /**
   * when the user starts a marquee selection
   */
  onMarqueeBeginSelection: (startingCoords: Readonly<Coordinate>) => void;
  /**
   * when the user ends a marquee selection
   */
  onMarqueeEndSelection: (marqueeBox: Readonly<BoundingBox>) => void;
};
