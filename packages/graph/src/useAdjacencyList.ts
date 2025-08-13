import {
  getDirectedOutboundEdges,
  getFracWeightBetweenNodes,
  getUndirectedOutboundEdges,
  getWeightBetweenNodes,
} from './helpers';
import type { GNode, Weight } from './types';
import type { Fraction } from 'mathjs';

import { onUnmounted, ref } from 'vue';

import type { BaseGraph } from './base';

/**
 * a mapping of nodes to their neighbors.
 * could take the form of either node ids or labels
 */
export type AdjacencyList = Record<string, string[]>;

export const getDirectedGraphAdjacencyList = (graph: BaseGraph) => {
  return graph.nodes.value.reduce<AdjacencyList>((acc, node) => {
    acc[node.id] = getDirectedOutboundEdges(node.id, graph.edges.value).map(
      (edge) => edge.to,
    );
    return acc;
  }, {});
};

export const getUndirectedGraphAdjacencyList = (graph: BaseGraph) => {
  return graph.nodes.value.reduce<AdjacencyList>((acc, node) => {
    acc[node.id] = getUndirectedOutboundEdges(node.id, graph.edges.value).map(
      (edge) => {
        return edge.from === node.id ? edge.to : edge.from;
      },
    );
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
export const getAdjacencyList = (graph: BaseGraph) => {
  const { isGraphDirected } = graph.settings.value;
  const fn = isGraphDirected
    ? getDirectedGraphAdjacencyList
    : getUndirectedGraphAdjacencyList;
  return fn(graph);
};

/**
 * creates a human readable adjacency list mapping node labels to the labels of their neighbors
 *
 * @returns an adjacency list using labels of nodes as keys as opposed to ids
 * @example getLabelAdjacencyList(graph)
 * // { 'A': ['B'], 'B': ['A'] }
 */
export const getLabelAdjacencyList = (graph: BaseGraph) => {
  const adjList = getAdjacencyList(graph);
  const adjListEntries = Object.entries(adjList);

  return adjListEntries.reduce<AdjacencyList>((acc, [keyNodeId, toNodeIds]) => {
    const keyNode = graph.getNode(keyNodeId);
    const toNodes = toNodeIds.map((to) => graph.getNode(to));

    if (!keyNode) throw new Error('the "key node" is missing from the graph');
    if (toNodes.some((node) => !node))
      throw new Error('a "to node" is missing from the graph');

    acc[keyNode.label] = (toNodes as GNode[]).map((node) => node.label);
    return acc;
  }, {});
};

/**
 * a mapping of nodes to their neighbors where
 * neighbors are the full node objects instead of just their ids or labels
 */
export type FullNodeAdjacencyList = Record<GNode['id'], GNode[]>;

/**
 * creates an adjacency list mapping node ids to the node objects of their neighbors
 *
 * @param graph the graph instance
 * @returns an adjacency list using ids of nodes as keys and the full node objects as values
 * @example getFullNodeAdjacencyList(graph)
 * // {
 * // 'abc123': [{ id: 'def456', label: 'B', x: 0, y: 0 }],
 * // 'def456': [{ id: 'abc123', label: 'A', x: 100, y: 100 }]
 * // }
 */
export const getFullNodeAdjacencyList = (graph: BaseGraph) => {
  const adjList = getAdjacencyList(graph);
  const adjListEntries = Object.entries(adjList);

  return adjListEntries.reduce<FullNodeAdjacencyList>(
    (acc, [keyNodeId, toNodeIds]) => {
      acc[keyNodeId] = toNodeIds.map((to) => graph.getNode(to)!);
      return acc;
    },
    {},
  );
};

/**
 * a mapping of nodes to their neighbors where neighbors are the full node objects
 * along with the weight of the edge connecting them to the key node
 */
export type WeightedAdjacencyList<T extends Weight = number> = Record<
  GNode['id'],
  (GNode & {
    /**
     * the weight of the edge that connects the key node to the neighbor node
     */
    weight: T;
  })[]
>;

/**
 * creates an adjacency list mapping node ids to nodes along with a added field `weight` that
 * represents the weight of the edge connecting them
 *
 * @param graph the graph instance
 * @param fallbackWeight the weight between two adjacent nodes if the label of the edge connecting them
 * cannot be parsed as a number. defaults to 1
 * @returns an adjacency list using ids of nodes as keys and the full node objects with weights as values
 * @example getWeightedAdjacencyList(graph)
 * // {
 * //   'abc123': [{ id: 'def456', label: 'B', weight: 1, x: 0, y: 0 }],
 * //   'def456': [{ id: 'abc123', label: 'A', weight: 1, x: 100, y: 100 }]
 * // }
 */
export const getWeightedAdjacencyList = (graph: BaseGraph) => {
  const adjList = getAdjacencyList(graph);
  const adjListEntries = Object.entries(adjList);

  return adjListEntries.reduce<WeightedAdjacencyList>(
    (acc, [keyNodeId, toNodeIds]) => {
      acc[keyNodeId] = toNodeIds.map((toNodeId) => ({
        ...graph.getNode(toNodeId)!,
        weight: getWeightBetweenNodes(keyNodeId, toNodeId, graph),
      }));
      return acc;
    },
    {},
  );
};

/**
 * the same as `getWeightedAdjacencyList` but with the weight type as a {@link Fraction}
 * instead of a number
 */
export const getFracWeightedAdjacencyList = (graph: BaseGraph) => {
  const adjList = getAdjacencyList(graph);
  const adjListEntries = Object.entries(adjList);

  return adjListEntries.reduce<WeightedAdjacencyList<Fraction>>(
    (acc, [keyNodeId, toNodeIds]) => {
      acc[keyNodeId] = toNodeIds.map((toNodeId) => ({
        ...graph.getNode(toNodeId)!,
        weight: getFracWeightBetweenNodes(keyNodeId, toNodeId, graph),
      }));
      return acc;
    },
    {},
  );
};

/**
 * reactively updating adjacency lists for a graph
 *
 * @param graph - the graph instance
 * @returns all forms of adjacency lists including standard (ids), labels, and full node
 * @example const lists = useAdjacencyList(graph)
 * lists.adjacencyList.value = { 'abc123': ['def456'], 'def456': ['abc123'] }
 * lists.labelAdjacencyList.value = { 'A': ['B'], 'B': ['A'] }
 * lists.fullNodeAdjacencyList.value = {
 *    'abc123': [{ id: 'def456', label: 'B', x: 0, y: 0 }],
 *    'def456': [{ id: 'abc123', label: 'A', x: 100, y: 100 }]
 * }
 * lists.weightedAdjacencyList.value = {
 *    'abc123': [{ id: 'def456', label: 'B', weight: 5, x: 0, y: 0 }],
 *    'def456': [{ id: 'abc123', label: 'A', weight: 10, x: 100, y: 100 }]
 * }
 */
export const useAdjacencyList = (graph: BaseGraph) => {
  const adjacencyList = ref<AdjacencyList>({});
  const labelAdjacencyList = ref<AdjacencyList>({});
  const fullNodeAdjacencyList = ref<FullNodeAdjacencyList>({});
  const weightedAdjacencyList = ref<WeightedAdjacencyList>({});
  const weightedFracAdjacencyList = ref<WeightedAdjacencyList<Fraction>>({});

  const directedAdjacencyList = ref<AdjacencyList>({});
  const undirectedAdjacencyList = ref<AdjacencyList>({});

  const update = () => {
    adjacencyList.value = getAdjacencyList(graph);
    labelAdjacencyList.value = getLabelAdjacencyList(graph);
    fullNodeAdjacencyList.value = getFullNodeAdjacencyList(graph);
    weightedAdjacencyList.value = getWeightedAdjacencyList(graph);
    weightedFracAdjacencyList.value = getFracWeightedAdjacencyList(graph);

    directedAdjacencyList.value = getDirectedGraphAdjacencyList(graph);
    undirectedAdjacencyList.value = getUndirectedGraphAdjacencyList(graph);
  };

  update();

  graph.subscribe('onStructureChange', update);

  onUnmounted(() => {
    graph.unsubscribe('onStructureChange', update);
  });

  return {
    /**
     * the adjacency list using node ids as keys
     */
    adjacencyList,
    /**
     * the adjacency list using node labels as keys
     */
    labelAdjacencyList,
    /**
     * the adjacency list using node ids as keys and full node objects as values
     */
    fullNodeAdjacencyList,
    /**
     * the adjacency list using node ids as keys and full node objects along with weights as values
     */
    weightedAdjacencyList,
    /**
     * the adjacency list using node ids as keys and full node objects along with fraction weights as values
     */
    weightedFracAdjacencyList,

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
