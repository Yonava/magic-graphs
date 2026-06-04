import type { Graph } from '../../shared/useGraphWithCanvas.ts';

import { SimulationGuard } from '../../shared/ui/general/sim/guard/index.ts';

export const canRunBasicSearch = (graph: Graph) =>
  new SimulationGuard(graph).minNodes(1);
