import type { Graph } from '@magic/graph/types';

import { SimulationGuard } from '../../shared/ui/general/sim/guard.ts';

export const canRunBasicSearch = (graph: Graph) =>
  new SimulationGuard(graph).minNodes(1);
