import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';

import { EventHub } from '../../events/createEventHub.ts';
import { CoreEventMap } from '../events.ts';
import { DEFAULT_POSITION } from './constants.ts';
import {
  NodePositionStoreControls,
  NodePositionUpdate,
  Position,
} from './types.ts';

export const createNodePositionStore = (
  events: EventHub<CoreEventMap>,
): NodePositionStoreControls => {
  const nodeIdToNodePosition = new Map<string, Position>();

  const getNodePosition: NodePositionStoreControls['get'] = (nodeId) =>
    nullThrows(
      nodeIdToNodePosition.get(nodeId),
      `could not resolve position from node with id ${nodeId}`,
    );

  const setNodePositions = (positions: NodePositionUpdate[]) => {
    for (const { nodeId, update: positionValueOrGetter } of positions) {
      const currentPosition = getNodePosition(nodeId);
      const position = getValue(positionValueOrGetter, currentPosition);
      currentPosition.x = position.x ?? currentPosition.x;
      currentPosition.y = position.y ?? currentPosition.y;
      currentPosition.z = position.z ?? currentPosition.z;
    }
  };

  const devStreamRegistry = (import.meta as { env?: { DEV?: boolean } }).env
    ?.DEV
    ? new FinalizationRegistry<void>(() => {
        console.warn(
          '[magic-graphs] A node position stream was garbage collected without stop() being called. Make sure to call stop() when the stream is done.',
        );
      })
    : null;

  const createStream: NodePositionStoreControls['createStream'] = () => {
    events.emit('onNodeMoveStreamStart');
    let stopped = false;
    const stream = {
      set: (pos: NodePositionUpdate) => setNodePositions([pos]),
      setMany: setNodePositions,
      stop: () => {
        stopped = true;
        events.emit('onNodesMoved');
        events.emit('onNodeMoveStreamEnd');
      },
    };
    devStreamRegistry?.register(stream, undefined);
    return stream;
  };

  return {
    get: getNodePosition,
    set: (position) => {
      setNodePositions([position]);
      events.emit('onNodesMoved');
    },
    setMany: (positions) => {
      setNodePositions(positions);
      events.emit('onNodesMoved');
    },
    createStream,
    _internal: {
      nodeIdToNodePosition,
      add: (nodePositions) => {
        for (const { id, ...position } of nodePositions) {
          nodeIdToNodePosition.set(id, { ...DEFAULT_POSITION, ...position });
        }
      },
      remove: (nodeIds) => {
        for (const id of nodeIds) {
          nodeIdToNodePosition.delete(id);
        }
      },
    },
  };
};
