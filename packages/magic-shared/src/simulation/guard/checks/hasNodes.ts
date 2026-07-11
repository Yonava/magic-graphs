import { Graph } from '../../../graph/types.ts';
import { GuardCheck } from '../SimulationGuard.ts';

export const createHasNodeCheck =
  (graph: Graph, minNodes: number): GuardCheck =>
  () => {
    const nodeCount = graph.nodes.value.length;
    console.log(nodeCount);
    if (nodeCount >= minNodes) return;
    return {
      reason: `Need at least ${minNodes} nodes. Graph has ${nodeCount} nodes!`,
    };
  };
