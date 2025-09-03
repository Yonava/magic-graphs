import type { Graph } from '@magic/graph/types';
import { SimulationGuard } from '@magic/products/shared/ui/general/sim/guard';

export const canRunDijkstras = (graph: Graph) =>
  new SimulationGuard(graph).weighted().nonNegativeEdgeWeights().minNodes(1);
