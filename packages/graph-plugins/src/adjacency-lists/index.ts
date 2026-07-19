import {
  AdjacencyList,
  AdjacencyListsPlugin,
  Graph,
  WeightedAdjacencyList,
} from './types.ts';

const getDirectedGraphAdjacencyList = (graph: Graph) => {
  return graph.nodes.reduce<AdjacencyList>((acc, node) => {
    acc[node.id] = graph.edges
      .filter((edge) => edge.source === node.id)
      .map((edge) => edge.target);
    return acc;
  }, {});
};

const getUndirectedGraphAdjacencyList = (graph: Graph) => {
  return graph.nodes.reduce<AdjacencyList>((acc, node) => {
    acc[node.id] = graph.edges
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
const getAdjacencyList = (graph: Graph) => {
  const { directed: isGraphDirected } = graph.metadata;
  const fn = isGraphDirected
    ? getDirectedGraphAdjacencyList
    : getUndirectedGraphAdjacencyList;
  return fn(graph);
};

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
const getWeightedAdjacencyList = (graph: Graph) => {
  const adjList = getAdjacencyList(graph);
  const adjListEntries = Object.entries(adjList);

  return adjListEntries.reduce<WeightedAdjacencyList>(
    (acc, [keyNodeId, toNodeIds]) => {
      acc[keyNodeId] = toNodeIds.map((toNodeId) => ({
        ...graph.getNode(toNodeId)!,
        weight: graph.getEdge(
          graph.helpers.nodes.getEdgeBetween(keyNodeId, toNodeId)!.id,
        ).weight,
      }));
      return acc;
    },
    {},
  );
};

export const adjacencyLists: AdjacencyListsPlugin = ({
  controls,
  events,
  actions,
  getters,
}) => {
  let standard: AdjacencyList = {};
  let weighted: WeightedAdjacencyList = {};
  let directed: AdjacencyList = {};
  let undirected: AdjacencyList = {};

  const update = () => {
    const graph: Graph = {
      ...controls,
      ...getters,
      events,
    };
    standard = getAdjacencyList(graph);
    weighted = getWeightedAdjacencyList(graph);

    directed = getDirectedGraphAdjacencyList(graph);
    undirected = getUndirectedGraphAdjacencyList(graph);
  };

  update();

  events.subscribe('onStructureChange', update);

  return {
    name: 'adjacencyLists',
    actions,
    getters,
    controls: {
      standard: () => standard,
      weighted: () => weighted,
      directed: () => directed,
      undirected: () => undirected,
    },
  };
};
