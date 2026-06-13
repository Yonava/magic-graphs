import { EventMapToEventRegistry } from '../../events/types.ts';

export type NodePositioningSystemEventMap = {
  onNodesMoved: () => void;
  onNodeMoveStreamStart: () => void;
  onNodeMoveStreamEnd: () => void;
};

type NodePositioningSystemEventRegistry =
  EventMapToEventRegistry<NodePositioningSystemEventMap>;

export const createNodePositioningSystemEventRegistry =
  (): NodePositioningSystemEventRegistry => ({
    onNodesMoved: new Set(),
    onNodeMoveStreamStart: new Set(),
    onNodeMoveStreamEnd: new Set(),
  });
