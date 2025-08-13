import type { Graph } from '@magic/graph/types';
import { SimulationGuard } from '@ui/product/sim/guard';

export const canRunDijkstras = (graph: Graph) =>
  new SimulationGuard(graph).weighted().nonNegativeEdgeWeights().minNodes(1);
