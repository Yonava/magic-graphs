import { getAllMsts } from '@graph/algorithms/minimum-spanning-trees';
import { computed } from '@reactive/primitives/index';

import { MinimumSpanningTreesPlugin } from './types.ts';

export const minimumSpanningTrees: MinimumSpanningTreesPlugin = ({
  controls,
}) => {
  return {
    name: 'minimumSpanningTrees',
    controls: {
      all: computed(() =>
        getAllMsts(
          controls.nodes(),
          controls
            .edges()
            .map((e) => ({ ...e, weight: controls.weights.get(e.id) })),
        ),
      ),
    },
  };
};
