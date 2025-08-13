import type { BaseGraph } from '../base';
import type { GNode } from '../types';
import type { AdjacencyList, AdjacencyLists } from '../useAdjacencyList';

import { computed } from 'vue';

import type { CharacteristicSCC } from './scc';

type GetCycles = (adjList: AdjacencyList) => GNode['id'][][];

export const getCycles: GetCycles = (adjList) => {
  const visited = new Set<string>();
  const cycles: string[][] = [];
  const stack: string[] = [];
  const inStack = new Set<string>();

  const dfs = (node: string, parent: string | null): void => {
    visited.add(node);
    stack.push(node);
    inStack.add(node);

    for (const neighbor of adjList[node] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, node);
      } else if (neighbor !== parent && inStack.has(neighbor)) {
        // A cycle is detected
        const cycleStartIndex = stack.indexOf(neighbor);
        const cycle = stack.slice(cycleStartIndex);
        const sortedCycle = [...cycle].sort(); // Ensure consistent ordering
        if (!cycles.some((existing) => areArraysEqual(existing, sortedCycle))) {
          cycles.push(sortedCycle);
        }
      }
    }

    stack.pop();
    inStack.delete(node);
  };

  // Helper function to check if two arrays are equal (ignoring order)
  const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((item) => arr2.includes(item));
  };

  // Check all connected components
  for (const node in adjList) {
    if (!visited.has(node)) {
      dfs(node, null);
    }
  }

  return cycles;
};

export const useCycles = (
  graph: BaseGraph & CharacteristicSCC & AdjacencyLists,
) => {
  const { settings, stronglyConnectedComponents, adjacencyList } = graph;

  const cycles = computed(() => {
    const { isGraphDirected } = settings.value;
    if (!isGraphDirected) {
      const res = getCycles(adjacencyList.value);
      return res.sort((a, b) => a.length - b.length);
    }

    return stronglyConnectedComponents.value
      .filter((scc) => scc.length > 1)
      .map((scc) => scc.map((node) => node.id));
  });

  const nodeIdToCycle = computed(() => {
    return cycles.value.reduce((acc, cycle, i) => {
      for (const nodeId of cycle) acc.set(nodeId, i);
      return acc;
    }, new Map<GNode['id'], number>());
  });

  const isAcyclic = computed(() => cycles.value.length === 0);

  return {
    cycles,
    nodeIdToCycle,
    isAcyclic,
  };
};

export type CharacteristicCycles = ReturnType<typeof useCycles>;
