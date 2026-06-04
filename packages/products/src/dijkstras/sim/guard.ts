import type { Graph } from '../../shared/useGraphWithCanvas.ts';

import { SimulationGuard } from '../../shared/ui/general/sim/guard/index.ts';

export const canRunDijkstras = (graph: Graph) =>
  new SimulationGuard(graph).weighted().nonNegativeEdgeWeights().minNodes(1);
