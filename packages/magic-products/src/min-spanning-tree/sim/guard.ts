import { SimulationGuard } from '../../shared/ui/general/sim/guard/index.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';

export const canRunMST = (graph: Graph) =>
  new SimulationGuard(graph).undirected().weighted().minEdges(1).connected();
