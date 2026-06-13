import { nullThrows } from '@magic/utils/assert';
import { MaybeGetter, getValue } from '@magic/utils/maybeGetter/index';

import { EventHub } from '../events/createEventHub.ts';
import { GNode } from '../types.ts';
import { CoreEventMap } from './events.ts';

export type Position = {
  x: number;
  y: number;
  z: number;
};

export type NodePositioningSystemControls = {
  get: (nodeId: string) => Position;
  set: (
    nodeId: string,
    positionValueOrGetter: MaybeGetter<Partial<Position>, [Position]>,
  ) => Position;
  /** @internal */
  _internal: {
    add: (nodePositions: (Pick<GNode, 'id'> & Partial<Position>)[]) => void;
    remove: (nodeIds: GNode['id'][]) => void;
    nodeIdToNodePosition: Map<string, Position>;
  };
};

export const createNodePositioningSystem = (
  events: EventHub<CoreEventMap>,
): NodePositioningSystemControls => {
  const nodeIdToNodePosition = new Map<string, Position>();

  const getNodePosition: NodePositioningSystemControls['get'] = (nodeId) =>
    nullThrows(
      nodeIdToNodePosition.get(nodeId),
      `could not resolve position from node with id ${nodeId}`,
    );

  const setNodePosition: NodePositioningSystemControls['set'] = (
    nodeId,
    positionValueOrGetter,
  ) => {
    const currentPosition = getNodePosition(nodeId);
    const position = getValue(positionValueOrGetter, currentPosition);
    currentPosition.x = position.x ?? currentPosition.x;
    currentPosition.y = position.y ?? currentPosition.y;
    currentPosition.z = position.z ?? currentPosition.z;
    return currentPosition;
  };

  return {
    get: getNodePosition,
    set: setNodePosition,
    _internal: {
      nodeIdToNodePosition,
      add: () => {},
      remove: () => {},
    },
  };
};
