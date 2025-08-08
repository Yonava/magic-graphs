import type { GNode, Graph } from '@graph/types';

import { computed } from 'vue';
import type { Ref } from 'vue';

import type { ComponentAdjacencyMap } from './useComponentAdjacencyMap';

/**
 * a set of states within a markov chain recurrent or transient class
 */
export type MarkovClass = Set<GNode['id']>;

/**
 * a map of node ids to the index of the recurrent or transient class they belong to
 */
export type MarkovStateToClassIndex = Map<GNode['id'], number>;

export const getMarkovClasses = (
  connectedComponents: Graph['characteristics']['stronglyConnectedComponents']['value'],
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
  const {
    stronglyConnectedComponents: sccs,
    componentAdjacencyMap: componentMap,
  } = graph.characteristics;

  const transientClasses = computed(() => {
    const { transient } = getMarkovClasses(sccs.value, componentMap.value);
    return transient;
  });

  const recurrentClasses = computed(() => {
    const { recurrent } = getMarkovClasses(sccs.value, componentMap.value);
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
