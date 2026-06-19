import { SimulationGuard } from '../../shared/ui/general/sim/guard/index.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';

export const canRunDijkstras = (graph: Graph) =>
  new SimulationGuard(graph).weighted().nonNegativeEdgeWeights().minNodes(1);
