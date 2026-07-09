import { SimulationGuard } from '../../shared/ui/general/sim/guard/index.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';

export const canRunBasicSearch = (graph: Graph) =>
  new SimulationGuard(graph).minNodes(1);
