import { CoreNode } from '@graph/primitives/types';

import { PhantomPlugin } from './types.ts';

export const phantom: PhantomPlugin = ({ actions, events, getters }) => {
  const nodes: CoreNode[] = [];

  return {
    name: 'phantom',
  };
};
