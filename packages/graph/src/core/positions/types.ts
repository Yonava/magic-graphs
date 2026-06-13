import { MaybeGetter } from '@magic/utils/maybeGetter/index';

import { GNode } from '../../types.ts';

export type Position = {
  x: number;
  y: number;
  z: number;
};

export type NodePositionUpdate = {
  nodeId: GNode['id'];
  update: MaybeGetter<Partial<Position>, [Position]>;
};

export type NodePositionStreamControls = {
  set: (position: NodePositionUpdate) => void;
  setMany: (positions: NodePositionUpdate[]) => void;
  stop: () => void;
};

export type NodePositionStoreControls = {
  get: (nodeId: string) => Position;
  set: (position: NodePositionUpdate) => void;
  setMany: (positions: NodePositionUpdate[]) => void;
  createStream: () => NodePositionStreamControls;
  /** @internal */
  _internal: {
    add: (positions: (Pick<GNode, 'id'> & Partial<Position>)[]) => void;
    remove: (nodeIds: GNode['id'][]) => void;
    nodeIdToNodePosition: Map<string, Position>;
  };
};
