import { GraphPlugin } from '@graph/plugins-shared/plugins';

export type MinimumSpanningTreesControls = {};

export type MinimumSpanningTreesPlugin = GraphPlugin<{
  name: 'minimum-spanning-trees';
  controls: MinimumSpanningTreesControls;
  dependsOn: [];
}>;
