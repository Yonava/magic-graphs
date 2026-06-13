import { MaybeGetter, getValue } from '@magic/utils/maybeGetter/index';

import { EventHub } from '../events/createEventHub.ts';
import { GNode } from '../types.ts';
import { CoreEventMap } from './events.ts';

type Position = {
  x: number;
  y: number;
  z: number;
};

export type NodePositioningSystemControls = {
  get: (nodeId: string) => Position | undefined;
  set: (
    nodeId: string,
    positionValueOrGetter: MaybeGetter<Partial<Position>, [Position]>,
  ) => Position | undefined;
};

export const createNodePositioningSystem = (
  events: EventHub<CoreEventMap>,
): NodePositioningSystemControls => {
  const nodeIdToNodePosition = new Map<string, Position>();

  events.subscribe('onNodesAdded', (nodes) => {
    for (const node of nodes) {
      nodeIdToNodePosition.set(node.id, {
        x: node.x,
        y: node.y,
        z: 1,
      });
    }
  });

  events.subscribe('onNodesRemoved', (nodeIds) => {
    for (const nodeId of nodeIds) {
      nodeIdToNodePosition.delete(nodeId);
    }
  });

  const getNodePosition: NodePositioningSystemControls['get'] = (nodeId) => {
    const position = nodeIdToNodePosition.get(nodeId);
    if (!position) {
      console.warn(`could not resolve position from node with id ${nodeId}`);
      return;
    }
    return position;
  };

  const setNodePosition: NodePositioningSystemControls['set'] = (
    nodeId,
    positionValueOrGetter,
  ) => {
    const currentPosition = getNodePosition(nodeId);
    if (!currentPosition) return;
    const position = getValue(positionValueOrGetter, currentPosition);
    currentPosition.x = position.x ?? currentPosition.x;
    currentPosition.y = position.y ?? currentPosition.y;
    currentPosition.z = position.z ?? currentPosition.z;
    return currentPosition;
  };

  return {
    get: getNodePosition,
    set: setNodePosition,
  };
};
