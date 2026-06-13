import { DeepReadonly } from 'ts-essentials';

import { EventMapToEventRegistry } from '../../events/types.ts';
import { NodePositionEntry } from './types.ts';

export type NodePositionStoreEventMap = {
  onNodePositionsCommitted: (positions: DeepReadonly<NodePositionEntry[]>) => void;
  onNodeMoveStreamStart: () => void;
  onNodeMoveStreamEnd: () => void;
  onNodeMoveStream: (positions: DeepReadonly<NodePositionEntry[]>) => void;
};

type NodePositionStoreEventRegistry =
  EventMapToEventRegistry<NodePositionStoreEventMap>;

export const createNodePositionStoreEventRegistry =
  (): NodePositionStoreEventRegistry => ({
    onNodePositionsCommitted: new Set(),
    onNodeMoveStreamStart: new Set(),
    onNodeMoveStreamEnd: new Set(),
    onNodeMoveStream: new Set(),
  });
