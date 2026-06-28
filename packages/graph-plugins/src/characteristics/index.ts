import {
  GraphPlugin,
  PluginOptions,
} from '@magic/graph-plugins-shared/plugins';
import { AdjacencyListsPlugin } from '../adjacency-lists/types.ts';
import {
  BidirectionalEdgesControls,
  useBidirectionalEdges,
} from './bidirectional.ts';
import { BipartiteControls, useBipartite } from './bipartite.ts';
import { CompleteControls, useComplete } from './complete.ts';
import { ConnectedControls, useConnected } from './connected.ts';
import { CyclesControls, useCycles } from './cycles.ts';
import { SCCControls, useStronglyConnectedComponents } from './scc.ts';

type CharacteristicsControls = {
  complete: CompleteControls;
  cycles: CyclesControls;
  sccs: SCCControls;
  bidirectionalEdges: BidirectionalEdgesControls;
  bipartite: BipartiteControls;
  connected: ConnectedControls;
};

type CharacteristicsPlugin = GraphPlugin<{
  controls: { characteristics: CharacteristicsControls };
  dependsOn: [AdjacencyListsPlugin];
}>;

export type Controls = PluginOptions<CharacteristicsPlugin>['controls'];

export const characteristics: CharacteristicsPlugin = ({
  controls,
  events,
  actions,
  getters,
}) => {
  const sccs = useStronglyConnectedComponents(controls);

  return {
    actions,
    events,
    getters,
    controls: {
      characteristics: {
        complete: useComplete(controls),
        cycles: useCycles(controls, sccs),
        sccs: sccs,
        bidirectionalEdges: useBidirectionalEdges(controls),
        bipartite: useBipartite(controls),
        connected: useConnected(controls),
      },
    },
  };
};
