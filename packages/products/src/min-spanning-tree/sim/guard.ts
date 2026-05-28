import type { Graph } from '@magic/graph/types';

import { SimulationGuard } from '../../shared/ui/general/sim/guard/index.ts';

export const canRunMST = (graph: Graph) =>
  new SimulationGuard(graph).undirected().weighted().minEdges(1).connected();
