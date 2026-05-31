import { Coordinate } from '@magic/canvas/types';
import { BoundingBox } from '@magic/shapes/types/utility';

import { EventMapToEventBus } from '../../events/index.ts';
import { GNode } from '../../types.ts';

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

type MarqueeGraphEventBus = EventMapToEventBus<MarqueeGraphEventMap>;

export const createMarqueeGraphEventBus = (): MarqueeGraphEventBus => ({
  onGroupDragStart: new Set(),
  onGroupDrop: new Set(),
  onMarqueeBeginSelection: new Set(),
  onMarqueeEndSelection: new Set(),
});
