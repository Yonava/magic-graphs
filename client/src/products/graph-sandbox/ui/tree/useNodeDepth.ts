import { computed } from 'vue';
import type { Ref } from 'vue';
import type { GNode, Graph } from '@graph/types';
import { useAdjacencyList } from '@graph/useAdjacencyList';
import type { AdjacencyList } from '@graph/useAdjacencyList';

// node id -> depth in a BFS tree
export type NodeIdToDepth = Map<GNode['id'], number>;

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
 * // nodeIdToDepth: Map<GNode['id'], number>
 * // depthToNodeIds: GNode['id'][][] (array of node ids at each depth)
 * // depth: number (with root node at depth 0)
 */
export const getNodeDepths = (startNode: GNode, adjList: AdjacencyList) => {
  const nodeIdToDepth: NodeIdToDepth = new Map();
  if (!adjList[startNode.id])
    throw new Error(`node with id ${startNode.id} not found in adj list`);

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
    depthToNodeIds: Array.from(nodeIdToDepth).reduce<GNode['id'][][]>(
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
export const useNodeDepth = (graph: Graph, startNode: Ref<GNode>) => {
  const { adjacencyList } = useAdjacencyList(graph);
  return computed(() => getNodeDepths(startNode.value, adjacencyList.value));
};

export type NodeDepth = ReturnType<typeof getNodeDepths>;
