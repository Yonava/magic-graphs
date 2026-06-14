import { onUnmounted, ref } from 'vue';

import { CoreEventMap } from './core/events.ts';
import type { CoreGraph } from './core/types.ts';
import type { GEdge, GNode } from './types.ts';

/**
 * a mapping of nodes to their neighbors
 */
export type AdjacencyList = Record<string, string[]>;

export const getDirectedGraphAdjacencyList = (
  graph: CoreGraphForAdjacencyList,
) => {
  return graph.nodes.value.reduce<AdjacencyList>((acc, node) => {
    acc[node.id] = graph.edges.value
      .filter((edge) => edge.source === node.id)
      .map((edge) => edge.target);
    return acc;
  }, {});
};

export const getUndirectedGraphAdjacencyList = (
  graph: CoreGraphForAdjacencyList,
) => {
  return graph.nodes.value.reduce<AdjacencyList>((acc, node) => {
    acc[node.id] = graph.edges.value
      .filter((edge) => edge.source === node.id || edge.target === node.id)
      .map((edge) => {
        return edge.source === node.id ? edge.target : edge.source;
      });
    return acc;
  }, {});
};

/**
 * creates an adjacency list mapping node ids to the node ids of their neighbors
 *
 * @param graph the graph instance
 * @returns an adjacency list using ids of nodes as keys
 * @example getAdjacencyList(graph)
 * // { 'abc123': ['def456'], 'def456': ['abc123'] }
 */
export const getAdjacencyList = (graph: CoreGraphForAdjacencyList) => {
  const { isGraphDirected } = graph.settings.value;
  const fn = isGraphDirected
    ? getDirectedGraphAdjacencyList
    : getUndirectedGraphAdjacencyList;
  return fn(graph);
};

/**
 * a mapping of nodes to their neighbors where neighbors are the full node objects
 * along with the weight of the edge connecting them to the key node
 */
export type WeightedAdjacencyList = Record<
  GNode['id'],
  (GNode & {
    /**
     * the weight of the edge that connects the key node to the neighbor node
     */
    weight: GEdge['weight'];
  })[]
>;

type CoreGraphForAdjacencyListParam<
  TransactionOptions = {},
  EventMap extends CoreEventMap = CoreEventMap,
  Plugins = {},
> = Pick<
  CoreGraph<TransactionOptions, EventMap, Plugins>,
  'settings' | 'getNode' | 'nodes' | 'edges' | 'helpers' | 'events'
>;

type CoreGraphForAdjacencyList = Omit<CoreGraphForAdjacencyListParam, 'events'>;

/**
 * creates an adjacency list mapping node ids to nodes along with a added field `weight` that
 * represents the weight of the edge connecting them
 *
 * @param graph the graph instance
 * @returns an adjacency list using ids of nodes as keys and the full node objects with weights as values
 * @example getWeightedAdjacencyList(graph)
 * // {
 * //   'abc123': [{ id: 'def456', weight: 1 }],
 * //   'def456': [{ id: 'abc123', weight: 1 }]
 * // }
 */
export const getWeightedAdjacencyList = (graph: CoreGraphForAdjacencyList) => {
  const adjList = getAdjacencyList(graph);
  const adjListEntries = Object.entries(adjList);

  return adjListEntries.reduce<WeightedAdjacencyList>(
    (acc, [keyNodeId, toNodeIds]) => {
      acc[keyNodeId] = toNodeIds.map((toNodeId) => ({
        ...graph.getNode(toNodeId)!,
        weight: graph.helpers.nodes.getEdgeBetween(keyNodeId, toNodeId)!.weight,
      }));
      return acc;
    },
    {},
  );
};

/**
 * reactively updating adjacency lists for a graph
 *
 * @example const lists = useAdjacencyList(graph)
 * lists.adjacencyList.value = { 'abc123': ['def456'], 'def456': ['abc123'] }
 * lists.weightedAdjacencyList.value = {
 *    'abc123': [{ id: 'def456', weight: 5 }],
 *    'def456': [{ id: 'abc123', weight: 10 }]
 * }
 */
export const useAdjacencyList = <
  TransactionOptions,
  EventMap extends CoreEventMap,
  Plugins,
>(
  graph: CoreGraphForAdjacencyListParam<TransactionOptions, EventMap, Plugins>,
) => {
  const adjacencyList = ref<AdjacencyList>({});
  const weightedAdjacencyList = ref<WeightedAdjacencyList>({});

  const directedAdjacencyList = ref<AdjacencyList>({});
  const undirectedAdjacencyList = ref<AdjacencyList>({});

  const update = () => {
    adjacencyList.value = getAdjacencyList(graph);
    weightedAdjacencyList.value = getWeightedAdjacencyList(graph);

    directedAdjacencyList.value = getDirectedGraphAdjacencyList(graph);
    undirectedAdjacencyList.value = getUndirectedGraphAdjacencyList(graph);
  };

  update();

  graph.events.subscribe('onStructureChange', update);

  onUnmounted(() => {
    graph.events.unsubscribe('onStructureChange', update);
  });

  return {
    /**
     * the adjacency list using node ids as keys
     */
    adjacencyList,
    /**
    /**
     * the adjacency list using node ids as keys and full node objects along with weights as values
     */
    weightedAdjacencyList,

    /**
     * the directed adjacency list using node ids as keys
     */
    directedAdjacencyList,
    /**
     * the undirected adjacency list using node ids as keys
     */
    undirectedAdjacencyList,
  };
};

export type AdjacencyLists = ReturnType<typeof useAdjacencyList>;
