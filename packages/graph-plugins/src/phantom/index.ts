import { Position } from '@graph/core/positions/types';
import { CoreNode } from '@graph/primitives/types';

import { PhantomPlugin } from './types.ts';

type PhantomNode = CoreNode & {
  position: Omit<Position, 'z'>;
};

export const phantom: PhantomPlugin = ({ actions, events, getters }) => {
  const nodes: PhantomNode[] = [
    { id: 'phantom-node-1', position: { x: 850, y: 430 } },
  ];

  return {
    name: 'phantom',
    controls: {},
  };
};
