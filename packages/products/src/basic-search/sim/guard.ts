import type { Graph } from '@magic/graph/types';
import { SimulationGuard } from '@magic/products/shared/ui/general/sim/guard';

export const canRunBasicSearch = (graph: Graph) =>
  new SimulationGuard(graph).minNodes(1);
