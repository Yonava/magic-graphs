import { getAllMsts } from '@graph/algorithms/minimum-spanning-trees';

import { MinimumSpanningTreesPlugin } from './types.ts';

export const minimumSpanningTrees: MinimumSpanningTreesPlugin = () => {
  return {
    name: 'minimum-spanning-trees',
    controls: {},
  };
};
