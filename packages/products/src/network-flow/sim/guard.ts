import type { Graph } from '@magic/graph/types';

import { SimulationGuard } from '../../shared/ui/general/sim/guard.ts';

export const canRunFordFulkerson = (graph: Graph) =>
  new SimulationGuard(graph)
    .weighted()
    .directed()
    .minNodes(2)
    .noSelfReferencingEdges()
    .noBidirectionalEdges();
