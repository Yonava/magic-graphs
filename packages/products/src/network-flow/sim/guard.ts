import type { Graph } from '@magic/graph/types';
import { SimulationGuard } from '@ui/product/sim/guard';

export const canRunFordFulkerson = (graph: Graph) =>
  new SimulationGuard(graph)
    .weighted()
    .directed()
    .minNodes(2)
    .noSelfReferencingEdges()
    .noBidirectionalEdges();
