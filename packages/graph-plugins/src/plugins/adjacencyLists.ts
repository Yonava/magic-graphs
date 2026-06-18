import { CoreEventMap } from '@magic/graph/core/events';
import type { CoreControls } from '@magic/graph/core/types';
import { EventHub } from '@magic/graph/events/createEventHub';
import {
  CoreGetters,
  GraphGetters,
  GraphPlugin,
} from '@magic/graph/plugins/types';
import type { CodeEdge, CoreNode } from '@magic/graph/types';

import { Ref, ref } from 'vue';

/**
 * a mapping of nodes to their neighbors
 */
export type AdjacencyList = Record<string, string[]>;

export const getDirectedGraphAdjacencyList = (graph: Graph) => {
  return graph.nodes.value.reduce<AdjacencyList>((acc, node) => {
    acc[node.id] = graph.edges.value
      .filter((edge) => edge.source === node.id)
      .map((edge) => edge.target);
    return acc;
  }, {});
};

export const getUndirectedGraphAdjacencyList = (graph: Graph) => {
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
export const getAdjacencyList = (graph: Graph) => {
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
  CoreNode['id'],
  (CoreNode & {
    /**
     * the weight of the edge that connects the key node to the neighbor node
     */
    weight: CodeEdge['weight'];
  })[]
>;

type Graph = Pick<CoreControls, 'settings' | 'nodes' | 'edges' | 'helpers'> & {
  events: EventHub<CoreEventMap>;
} & GraphGetters<CoreGetters>;

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
export const getWeightedAdjacencyList = (graph: Graph) => {
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

type AdjacencyListsControls = {
  /**
   * the adjacency list using node ids as keys
   */
  standard: Ref<AdjacencyList>;
  /**
   * the adjacency list using node ids as keys and full node objects along with weights as values
   */
  weighted: Ref<WeightedAdjacencyList>;
  /**
   * the directed adjacency list using node ids as keys
   */
  directed: Ref<AdjacencyList>;
  /**
   * the undirected adjacency list using node ids as keys
   */
  undirected: Ref<AdjacencyList>;
};

export type AdjacencyListsPlugin = GraphPlugin<{
  controls: { adjacencyLists: AdjacencyListsControls };
}>;

export const adjacencyLists: AdjacencyListsPlugin = (
  controls,
  events,
  actions,
  getters,
) => {
  const standard = ref<AdjacencyList>({});
  const weighted = ref<WeightedAdjacencyList>({});

  const directed = ref<AdjacencyList>({});
  const undirected = ref<AdjacencyList>({});

  const update = () => {
    const graph = {
      ...controls,
      ...getters,
      events,
    };
    standard.value = getAdjacencyList(graph);
    weighted.value = getWeightedAdjacencyList(graph);

    directed.value = getDirectedGraphAdjacencyList(graph);
    undirected.value = getUndirectedGraphAdjacencyList(graph);
  };

  update();

  events.subscribe('onStructureChange', update);

  return {
    actions,
    getters,
    events,
    controls: {
      adjacencyLists: { standard, weighted, directed, undirected },
    },
  };
};
