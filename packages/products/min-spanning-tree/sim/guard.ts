import type { Graph } from '@graph/types';
import { SimulationGuard } from '@ui/product/sim/guard';

export const canRunMST = (graph: Graph) =>
  new SimulationGuard(graph).undirected().weighted().minEdges(1).connected();
