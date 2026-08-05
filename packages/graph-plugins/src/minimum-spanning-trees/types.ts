import type { GetAllMstsResult } from '@graph/algorithms/minimum-spanning-trees';
import { GraphPlugin } from '@graph/plugins-shared/plugins';

export type MinimumSpanningTreesControls = {
  all: () => GetAllMstsResult;
};

export type MinimumSpanningTreesPlugin = GraphPlugin<{
  name: 'minimumSpanningTrees';
  controls: MinimumSpanningTreesControls;
  dependsOn: [];
}>;
