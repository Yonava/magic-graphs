import { Coordinate } from '@magic/canvas/types';
import { BoundingBox } from '@magic/shapes/types/utility';

import { EventMapToEventRegistry } from '../../events/types.ts';
import { GNode } from '../../types.ts';

export type MarqueeEventMap = {
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

type MarqueeEventRegistry = EventMapToEventRegistry<MarqueeEventMap>;

export const createMarqueeEventRegistry = (): MarqueeEventRegistry => ({
  onGroupDragStart: new Set(),
  onGroupDrop: new Set(),
  onMarqueeBeginSelection: new Set(),
  onMarqueeEndSelection: new Set(),
});
