import { Graph } from '../../../graph/types.ts';
import { GuardCheck } from '../SimulationGuardBuilder.ts';

export const createHasNodeCheck =
  (graph: Graph, minNodes: number): GuardCheck =>
  () => {
    const nodeCount = graph.nodes.value.length;
    if (nodeCount >= minNodes) return;
    return {
      id: 'min-nodes',
      reason: `Need at least ${minNodes} nodes. Graph has ${nodeCount} nodes!`,
    };
  };
