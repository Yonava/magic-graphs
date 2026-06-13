import { EventMapToEventRegistry } from '../../events/types.ts';

export type NodePositionStoreEventMap = {
  onNodesMoved: () => void;
  onNodeMoveStreamStart: () => void;
  onNodeMoveStreamEnd: () => void;
};

type NodePositionEventRegistry =
  EventMapToEventRegistry<NodePositionStoreEventMap>;

export const createNodePositionEventRegistry =
  (): NodePositionEventRegistry => ({
    onNodesMoved: new Set(),
    onNodeMoveStreamStart: new Set(),
    onNodeMoveStreamEnd: new Set(),
  });
