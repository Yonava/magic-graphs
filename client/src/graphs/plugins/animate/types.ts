import type {
  BroadcastOption,
  HistoryOption,
  PersistOption,
} from '@graph/base/types';
import type { GNode } from '@graph/types';
import type { Coordinate } from '@shape/types/utility';

export type AnimateNodeMoveOptions = {
  /**
   * the id of the node to move
   */
  nodeId: GNode['id'];
  /**
   * the coordinates of the node after the move
   */
  endCoords: Coordinate;
  /**
   * the duration of the animation in milliseconds.
   * must be greater than 100
   * @default 300
   */
  durationMs?: number;
} & Partial<HistoryOption & BroadcastOption & PersistOption>;

export const ANIMATE_NODE_MOVE_OPTIONS_DEFAULTS = {
  durationMs: 300,
  broadcast: true,
  history: true,
  persist: true,
} as const;
