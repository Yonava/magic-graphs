import { GraphPlugin, PluginOptions } from '@graph/plugins-shared/plugins';
import { CoreEdge } from '@graph/primitives/types';

import { AdjacencyListsPlugin } from '../adjacency-lists/types.ts';
import { getBidirectionalEdges } from './bidirectional.ts';
import { BipartiteData, getBipartiteData } from './bipartite.ts';
import { isComplete } from './complete.ts';
import { ConnectedData, getConnectedData } from './connected.ts';
import { CycleData, getCycleData } from './cycles.ts';
import {
  StronglyConnectedComponentsData,
  getStronglyConnectedComponents,
  getStronglyConnectedComponentsData,
} from './scc.ts';

export type CharacteristicsControls = {
  isComplete: () => boolean;
  getCycles: () => CycleData;
  sccs: () => StronglyConnectedComponentsData;
  bidirectionalEdges: () => CoreEdge[];
  bipartite: () => BipartiteData;
  connected: () => ConnectedData;
};

export type CharacteristicsPlugin = GraphPlugin<{
  name: 'characteristics';
  controls: CharacteristicsControls;
  dependsOn: [AdjacencyListsPlugin];
}>;

export type Controls = PluginOptions<CharacteristicsPlugin>['controls'];

export const characteristics: CharacteristicsPlugin = ({
  controls,
  events,
  actions,
  getters,
}) => ({
  name: 'characteristics',
  actions,
  events,
  getters,
  controls: {
    isComplete: () => isComplete(controls),
    getCycles: () =>
      getCycleData(controls, getStronglyConnectedComponents(controls)),
    sccs: () => getStronglyConnectedComponentsData(controls),
    bidirectionalEdges: () => getBidirectionalEdges(controls),
    bipartite: () => getBipartiteData(controls),
    connected: () => getConnectedData(controls),
  },
});
