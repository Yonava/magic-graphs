import type { AdjacencyList } from '@graph/useAdjacencyList';

import { type Ref, computed } from 'vue';

type BipartitePartition = [string[], string[]];
type GetBipartitePartition = (
  adjList: Readonly<AdjacencyList>,
) => BipartitePartition | undefined;

export type NodeIdToBipartiteSet = Map<string, 0 | 1>;

export const getBipartitePartition: GetBipartitePartition = (adjList) => {
  const colors: { [node: string]: 0 | 1 } = {};
  const groups: BipartitePartition = [[], []];

  const completeGraph: AdjacencyList = { ...adjList };

  // Ensure all nodes are in the graph
  Object.keys(adjList).forEach((node) => {
    if (!completeGraph[node]) {
      completeGraph[node] = [];
    }
  });

  // Build a reverse adjacency list to check incoming edges
  const reverseGraph: AdjacencyList = {};
  Object.entries(completeGraph).forEach(([node, neighbors]) => {
    neighbors.forEach((neighbor) => {
      if (!reverseGraph[neighbor]) {
        reverseGraph[neighbor] = [];
      }
      reverseGraph[neighbor].push(node);
    });
  });

  // Helper function to perform BFS coloring
  const bfs = (startNode: string): boolean => {
    const queue: string[] = [startNode];
    colors[startNode] = 0;
    groups[0].push(startNode);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      const currentColor = colors[currentNode];
      const neighborColor = currentColor === 0 ? 1 : 0;

      // Check both outgoing and incoming edges
      const outgoingNeighbors = completeGraph[currentNode] || [];
      const incomingNeighbors = reverseGraph[currentNode] || [];
      const allNeighbors = [
        ...new Set([...outgoingNeighbors, ...incomingNeighbors]),
      ];

      for (const neighbor of allNeighbors) {
        // If neighbor hasn't been colored yet
        if (colors[neighbor] === undefined) {
          colors[neighbor] = neighborColor;
          groups[neighborColor].push(neighbor);
          queue.push(neighbor);
        }
        // If neighbor has been colored, check for conflict
        else if (colors[neighbor] === currentColor) {
          return false; // Not bi-partite
        }
      }
    }
    return true;
  };

  // Try to color all nodes
  for (const node of Object.keys(completeGraph)) {
    if (colors[node] === undefined) {
      if (!bfs(node)) {
        return undefined; // Not bi-partite
      }
    }
  }

  return groups;
};

export const useBipartite = (adjList: Ref<AdjacencyList>) => {
  const bipartitePartition = computed(() =>
    getBipartitePartition(adjList.value),
  );

  const nodeIdToBipartitePartition = computed(() => {
    const partition = bipartitePartition.value;
    const map: NodeIdToBipartiteSet = new Map();
    if (!partition) return map;
    const [left, right] = partition;
    for (const nodeId of left) map.set(nodeId, 0);
    for (const nodeId of right) map.set(nodeId, 1);
    return map;
  });

  const isBipartite = computed(() => bipartitePartition.value !== undefined);

  return {
    bipartitePartition,
    nodeIdToBipartitePartition,
    isBipartite,
  };
};

export type CharacteristicBipartite = ReturnType<typeof useBipartite>;
