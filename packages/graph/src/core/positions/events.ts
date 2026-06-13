import { EventMapToEventRegistry } from '../../events/types.ts';

export type NodePositionStoreEventMap = {
  onNodesMoved: () => void;
  onNodeMoveStreamStart: () => void;
  onNodeMoveStreamEnd: () => void;
};

type NodePositionStoreEventRegistry =
  EventMapToEventRegistry<NodePositionStoreEventMap>;

export const createNodePositionStoreEventRegistry =
  (): NodePositionStoreEventRegistry => ({
    onNodesMoved: new Set(),
    onNodeMoveStreamStart: new Set(),
    onNodeMoveStreamEnd: new Set(),
  });
