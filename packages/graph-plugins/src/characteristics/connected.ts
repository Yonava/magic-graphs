import { DeepReadonly } from 'ts-essentials';

import { AdjacencyList } from '../adjacency-lists/types.ts';
import { Controls } from './index.ts';

export type ConnectedData = {
  /**
   * whether every node can reach every other node following edge direction
   */
  isConnected: boolean;
  /**
   * whether every node can reach every other node when edge direction is ignored,
   * ie the graph is a single connected component
   */
  isWeaklyConnected: boolean;
  /**
   * the connected components of the graph, treating edges as undirected
   */
  components: ConnectedComponents;
};

export type ConnectedComponents = {
  /**
   * the node ids of each connected component.
   *
   * every node appears in exactly one component and components are ordered by the
   * first node id encountered in each of them
   *
   * @example
   * value // [['1', '2'], ['3']] -> nodes 1 and 2 are connected, node 3 is isolated
   */
  value: string[][];
  /**
   * maps a node id to the index of the component it belongs to
   *
   * @example
   * map.get('3') // 1 -> node 3 belongs to value[1]
   */
  map: Map<string, number>;
};

export const getConnectedData = (controls: Controls): ConnectedData => {
  const { adjacencyLists } = controls;

  const bfs = (adjList: DeepReadonly<AdjacencyList>, startNode: string) => {
    const visited = new Set<string>();
    const queue = [startNode];

    while (queue.length > 0) {
      const nodeId = queue.shift();
      if (!nodeId) break;
      visited.add(nodeId);
      const neighbors = adjList[nodeId] ?? [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) queue.push(neighbor);
      }
    }

    return visited;
  };

  const getIsConnectedWithAdjList = (adjList: DeepReadonly<AdjacencyList>) =>
    Object.keys(adjList).every((nodeId) => {
      const visited = bfs(adjList, nodeId);
      return visited.size === Object.keys(adjList).length;
    });

  const getComponents = (
    adjList: DeepReadonly<AdjacencyList>,
  ): ConnectedComponents => {
    const value: string[][] = [];
    const map = new Map<string, number>();

    for (const nodeId of Object.keys(adjList)) {
      if (map.has(nodeId)) continue;
      const component = [...bfs(adjList, nodeId)];
      for (const memberId of component) map.set(memberId, value.length);
      value.push(component);
    }

    return { value, map };
  };

  const components = getComponents(adjacencyLists.undirected());

  return {
    isConnected: getIsConnectedWithAdjList(adjacencyLists.standard()),
    isWeaklyConnected: components.value.length <= 1,
    components,
  };
};
