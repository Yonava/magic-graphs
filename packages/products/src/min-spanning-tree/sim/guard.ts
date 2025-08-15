import type { Graph } from '@magic/graph/types';
import { SimulationGuard } from '@magic/ui/product/sim/guard';

export const canRunMST = (graph: Graph) =>
  new SimulationGuard(graph).undirected().weighted().minEdges(1).connected();
