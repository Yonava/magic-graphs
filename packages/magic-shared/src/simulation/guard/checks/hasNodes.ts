import { Graph } from '../../../graph/types.ts';
import { SimulationGuardCheck } from '../SimulationGuard.ts';

export const createHasNodeCheck =
  (graph: Graph, minNodes: number): SimulationGuardCheck =>
  () => {
    const nodeCount = graph.nodes.value.length;
    if (nodeCount >= minNodes) return;
    return {
      reason: `Need at least ${minNodes} nodes. Graph has ${nodeCount} nodes!`,
    };
  };
