import { NodeRole } from '@magic/shared/node-theme';
import { useProvidedGraph } from '@magic/shared/product';
import { MagicGraph } from '@magic/shared/product/useGraphProduct';

import { ref } from 'vue';

import { bfs } from './bfs.ts';
import { dfs } from './dfs.ts';
import { StartNodeId, traversalSimulationDefinition } from './shared.ts';

export type TraversalSimulationOptions = {
  graph: MagicGraph;
  startNodeId: StartNodeId;
};

// current = node being explored this frame.
// visited = has been explored.
// queued = unexplored but discovered and waiting in a queue or stack.
type TraversalConcept = 'current' | 'visited' | 'queued';

export const nodeRoles = {
  current: 'active',
  visited: 'settled',
  queued: 'pending',
} as const satisfies Record<TraversalConcept, NodeRole>;

export const useTraversalSimulations = () => {
  const graph = useProvidedGraph();
  const startNodeId: StartNodeId = ref();
  const options: TraversalSimulationOptions = { graph, startNodeId };

  return {
    bfs: traversalSimulationDefinition(bfs, options),
    dfs: traversalSimulationDefinition(dfs, options),
    startNodeId,
  };
};
