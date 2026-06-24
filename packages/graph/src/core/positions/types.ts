import { MaybeGetter } from '@magic/utils/maybeGetter/index';

import { CoreNode } from '../../../../graph-core-infra/src/types.ts';
import type { NodePositionStoreEventMap } from './events.ts';

export type Position = {
  x: number;
  y: number;
  z: number;
};

export type NodePositionEntry = {
  nodeId: CoreNode['id'];
  position: Position;
};

export type NodePositionUpdate = {
  nodeId: CoreNode['id'];
  update: MaybeGetter<Partial<Position>, [Position]>;
};

/** Controls for a position update stream. */
export type NodePositionStreamControls = {
  /** Updates a single node's position within this stream. */
  set: (position: NodePositionUpdate) => NodePositionEntry;
  /** Updates multiple nodes' positions within this stream. */
  setMany: (positions: NodePositionUpdate[]) => NodePositionEntry[];
  /** Closes the stream, signaling that all updates have been dispatched. */
  stop: () => void;
};

export type NodePositionStoreControls = {
  /** Returns the current position of a node. */
  get: (nodeId: string) => Position;
  /** Updates a single node's position and triggers {@link NodePositionStoreEventMap.onNodePositionsCommitted onNodePositionsCommitted}. */
  set: (position: NodePositionUpdate) => NodePositionEntry;
  /** Updates multiple nodes' positions and triggers {@link NodePositionStoreEventMap.onNodePositionsCommitted onNodePositionsCommitted}. */
  setMany: (positions: NodePositionUpdate[]) => NodePositionEntry[];
  /**
   * Opens a {@link NodePositionStreamControls position update stream}. Use this when moving nodes
   * continuously (e.g. dragging). Intermediate positions are batched inside the stream and
   * {@link NodePositionStoreEventMap.onNodePositionsCommitted onNodePositionsCommitted} only triggers once on {@link NodePositionStreamControls.stop stop},
   * so subscribers (e.g. plugins/history) see a single discrete move rather than every intermediate update.
   */
  createStream: () => NodePositionStreamControls;
  /** @internal */
  _internal: {
    add: (positions: (Pick<CoreNode, 'id'> & Partial<Position>)[]) => void;
    remove: (nodeIds: CoreNode['id'][]) => void;
    nodeIdToNodePosition: Map<string, Position>;
  };
};
