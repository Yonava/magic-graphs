import { AdjacencyList } from '@graph/plugins/adjacency-lists/types';
import { DeepReadonly } from 'ts-essentials';

import { computed } from 'vue';
import type { Ref } from 'vue';

import type { Graph } from '../useGraphWithCanvas.ts';

/** node id -> depth in a BFS tree */
export type NodeIdToDepth = Map<string, number>;

/**
 * get the depth of each node in the tree rooted at startNode
 * using BFS traversal
 *
 * @param startNode the root node of the tree
 * @param adjList the adjacency list of the graph
 * @returns the depth of each node in the tree
 * and the depth of the tree itself
 * @example
 * const { nodeIdToDepth, depthToNodeIds, depth } = getNodeDepths(startNode, adjList)
 * // nodeIdToDepth: Map<string, number>
 * // depthToNodeIds: string[][] (array of node ids at each depth)
 * // depth: number (with root node at depth 0)
 */
export const getNodeDepths = (
  startNode: { id: string },
  adjList: DeepReadonly<AdjacencyList>,
) => {
  const nodeIdToDepth: NodeIdToDepth = new Map();
  if (!adjList[startNode.id]) {
    throw new Error(
      `node with id ${startNode.id} not found in provided adjacency list`,
    );
  }

  let queue = [startNode.id];
  const visited = new Set(queue);

  let currentDepth = 0;

  while (queue.length > 0) {
    const nextQueue = [];

    for (const nodeId of queue) {
      nodeIdToDepth.set(nodeId, currentDepth);

      for (const neighbor of adjList[nodeId]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          nextQueue.push(neighbor);
        }
      }
    }

    queue = [];
    queue.push(...nextQueue);
    currentDepth++;
  }

  return {
    nodeIdToDepth,
    depthToNodeIds: Array.from(nodeIdToDepth).reduce<string[][]>(
      (acc, [nodeId, depth]) => {
        if (!acc[depth]) {
          acc[depth] = [];
        }
        acc[depth].push(nodeId);
        return acc;
      },
      [],
    ),
    /**
     * depth of the tree. root node is at depth 0.
     */
    depth: currentDepth - 1,
  };
};

/**
 * reactive {@link NodeIdToDepth | node depth} computation using BFS
 *
 * @param graph useGraph instance
 * @param startNode the root node of the tree
 * @returns reactive map of node id to depth and the depth of the tree
 */
export const useNodeDepth = (graph: Graph, startNode: Ref<{ id: string }>) => {
  return computed(() =>
    getNodeDepths(startNode.value, graph.adjacencyLists.standard.value),
  );
};

export type NodeDepth = ReturnType<typeof getNodeDepths>;
