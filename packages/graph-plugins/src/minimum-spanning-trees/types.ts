import { GraphPlugin } from '@graph/plugins-shared/plugins';
import type { CoreEdge } from '@graph/primitives/types';
import Fraction from 'fraction.js';

/** an edge of a spanning tree, carrying the weight it was ranked by */
export type MstEdge = CoreEdge & {
  weight: Fraction;
};

export type MinimumSpanningTreesResult = {
  /** every MST of the graph, or every minimum spanning forest when disconnected */
  msts: MstEdge[][];
  /** the weight shared by every entry in `msts` */
  totalWeight: Fraction;
  /** whether the returned trees span every node, false for a forest */
  connected: boolean;
};

export type MinimumSpanningTreesControls = {
  all: () => MinimumSpanningTreesResult;
};

export type MinimumSpanningTreesPlugin = GraphPlugin<{
  name: 'minimumSpanningTrees';
  controls: MinimumSpanningTreesControls;
  dependsOn: [];
}>;
