import type { Graph } from '@magic/graph/types';
import { SimulationGuard } from '@ui/product/sim/guard';

export const canRunBasicSearch = (graph: Graph) =>
  new SimulationGuard(graph).minNodes(1);
