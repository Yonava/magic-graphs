import type { Graph } from '../../shared/useGraphWithCanvas.ts';

import { SimulationGuard } from '../../shared/ui/general/sim/guard/index.ts';

export const canRunFordFulkerson = (graph: Graph) =>
  new SimulationGuard(graph)
    .weighted()
    .directed()
    .minNodes(2)
    .noSelfReferencingEdges()
    .noBidirectionalEdges();
