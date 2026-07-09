import { computed } from 'vue';

import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { ComponentAdjacencyMap } from './useComponentAdjacencyMap.ts';

/**
 * a set of states within a markov chain recurrent or transient class
 */
export type MarkovClass = Set<string>;

/**
 * a map of node ids to the index of the recurrent or transient class they belong to
 */
export type MarkovStateToClassIndex = Map<string, number>;

export const getMarkovClasses = (
  connectedComponents: Graph['characteristics']['sccs']['value']['components'],
  componentMap: ComponentAdjacencyMap,
) => {
  const recurrent: MarkovClass[] = [];
  const transient: MarkovClass[] = [];

  for (const [component, reachableComponents] of componentMap) {
    const leaf = reachableComponents.size === 0;
    const classMembership = leaf ? recurrent : transient;
    classMembership.push(
      new Set(connectedComponents[component].map((node) => node.id)),
    );
  }

  return {
    recurrent,
    transient,
  };
};

/**
 * reactive recurrent and transient classes of a markov chain
 */
export const useMarkovClasses = (graph: Graph) => {
  const transientClasses = computed(() => {
    const { components, componentAdjacencyMap } =
      graph.characteristics.sccs.value;
    const { transient } = getMarkovClasses(components, componentAdjacencyMap);
    return transient;
  });

  const recurrentClasses = computed(() => {
    const { components, componentAdjacencyMap } =
      graph.characteristics.sccs.value;
    const { recurrent } = getMarkovClasses(components, componentAdjacencyMap);
    return recurrent;
  });

  const toClassMap = (classes: MarkovClass[]) => {
    return classes.reduce<MarkovStateToClassIndex>((acc, _class, i) => {
      _class.forEach((nodeId) => acc.set(nodeId, i));
      return acc;
    }, new Map());
  };

  return {
    /**
     * an array of sets where each set contains the node/state ids of a transient class
     */
    transientClasses,
    /**
     * an array of sets where each set contains the node/state ids of a recurrent class
     */
    recurrentClasses,
    /**
     * a map of node ids to the index of the recurrent class they belong to
     */
    nodeIdToRecurrentClassIndex: computed(() =>
      toClassMap(recurrentClasses.value),
    ),
    /**
     * a map of node ids to the index of the transient class they belong to
     */
    nodeIdToTransientClassIndex: computed(() =>
      toClassMap(transientClasses.value),
    ),
  };
};

export type MarkovClasses = ReturnType<typeof useMarkovClasses>;
