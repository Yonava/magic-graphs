import { EventHub } from '../events/createEventHub.ts';
import { CoreEventMap } from './events.ts';

type Position = {
  x: number;
  y: number;
  z: number;
};

export const createNodePositioningSystem = (events: EventHub<CoreEventMap>) => {
  const nodeIdToNodePosition = new Map<string, Position>();

  events.subscribe('onNodesAdded', (nodes) => {
    console.log('nodes added', nodes);
    for (const node of nodes) {
      nodeIdToNodePosition.set(node.id, {
        x: node.x,
        y: node.y,
        z: 1,
      });
    }
  });

  // events.subscribe('onNodesRemoved');
};
