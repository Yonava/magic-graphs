import type { Graph } from '@magic/graph/types';

import { computed } from 'vue';

/**
 * a adjacency map for strongly connected components.
 * @see {@link getComponentAdjMap}
 */
export type ComponentAdjacencyMap = Map<number, Set<number>>;

/**
 * get a map that maps each strongly connected component in the graph to the
 * components it can reach and are adjacent to it.
 *
 * @param graph graph instance
 * @returns component adjacency map
 * @example const map = getComponentAdjMap(graph)
 * map.get(2) // Set(3, 4, 5) -> component 2 is connected to components 3, 4, 5
 * map.get(1) // Set() -> component 1 is not connected to any other component
 */
export const getComponentAdjMap = (graph: Graph) => {
  const nodeToComponentMap =
    graph.characteristics.nodeIdToConnectedComponent.value;
  const connectedComponents =
    graph.characteristics.stronglyConnectedComponents.value;
  const graphAdjMap = graph.adjacencyList.adjacencyList.value;

  /**
   * index of graph connected component -> indices of connected components adjacent to it
   */
  const componentAdjMap: ComponentAdjacencyMap = new Map();

  connectedComponents.forEach((component, componentIndex) => {
    const componentChildren = component
      .flatMap((node) => graphAdjMap[node.id] ?? [])
      .filter((nodeId) => nodeToComponentMap.get(nodeId) !== componentIndex);

    const mappedComponentChildren = componentChildren.map((node) => {
      const componentIndex = nodeToComponentMap.get(node);
      if (componentIndex === undefined)
        throw new Error('Component index not found');
      return componentIndex;
    });

    componentAdjMap.set(componentIndex, new Set(mappedComponentChildren));
  });

  return componentAdjMap;
};

/**
 * reactive {@link ComponentAdjacencyMap | component adjacency map}
 *
 * @param graph graph instance
 * @returns reactive component adjacency map
 * @see {@link getComponentAdjMap}
 */
export const useComponentAdjacencyMap = (graph: Graph) => {
  return computed(() => getComponentAdjMap(graph));
};
