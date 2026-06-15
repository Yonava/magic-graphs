import { computed } from 'vue';

import { CoreGraph } from '../core/types.ts';
import type { GEdge, GNode } from '../types.ts';
import type { AdjacencyLists } from '../useAdjacencyList.ts';
import TarjanGraph from './tarjans.ts';

type GetComponents = (nodes: GNode[], edges: GEdge[]) => GNode[][];

/**
 * maps a node id to the index of the strongly connected component it belongs to
 */
export type NodeIdToComponent = Map<GNode['id'], number>;

/**
 * maps the index of a strongly connected component to a set of indices of
 * strongly connected components that are adjacent to it.
 */
export type ComponentAdjacencyMap = Map<number, Set<number>>;

/**
 * uses Tarjan's algorithm to find the strongly connected components of a graph
 */
export const getStronglyConnectedComponents: GetComponents = (nodes, edges) => {
  const tarjan = new TarjanGraph(nodes.length);
  const nodeIds = nodes.map((node) => node.id);

  for (const edge of edges) {
    tarjan.addEdge(nodeIds.indexOf(edge.source), nodeIds.indexOf(edge.target));
  }

  const result = tarjan.SCC();
  return result.map((component) =>
    component.map((nodeIndex) => nodes[nodeIndex]),
  );
};

export const useStronglyConnectedComponents = (
  graph: Pick<CoreGraph, 'nodes' | 'edges'>,
  adjacencyLists: Pick<AdjacencyLists, 'adjacencyList'>,
) => {
  const { nodes, edges } = graph;
  const { adjacencyList } = adjacencyLists;

  const stronglyConnectedComponents = computed(() => {
    return getStronglyConnectedComponents(nodes.value, edges.value);
  });

  const nodeIdToConnectedComponent = computed(() => {
    const sccs = stronglyConnectedComponents.value;
    return sccs.reduce<NodeIdToComponent>((acc, scc, i) => {
      for (const { id } of scc) acc.set(id, i);
      return acc;
    }, new Map());
  });

  /**
   * a map that maps each strongly connected component in the graph to the
   * components it can reach and are adjacent to it.
   *
   * @example
   * map.get(2) // Set(3, 4, 5) -> component 2 is connected to components 3, 4, 5
   * map.get(1) // Set() -> component 1 is not connected to any other component
   */
  const componentAdjacencyMap = computed(() => {
    const sccs = stronglyConnectedComponents.value;
    const nodeToScc = nodeIdToConnectedComponent.value;

    return sccs.reduce<ComponentAdjacencyMap>((acc, comp, compIndex) => {
      const componentChildren = comp
        .flatMap((node) => adjacencyList.value[node.id] ?? [])
        .filter((nodeId) => nodeToScc.get(nodeId) !== compIndex)
        .map((nodeId) => nodeToScc.get(nodeId)!);

      acc.set(compIndex, new Set(componentChildren));
      return acc;
    }, new Map());
  });

  return {
    stronglyConnectedComponents,
    nodeIdToConnectedComponent,
    componentAdjacencyMap,
  };
};

export type CharacteristicSCC = ReturnType<
  typeof useStronglyConnectedComponents
>;
