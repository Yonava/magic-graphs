import type { GNode, Graph } from '@magic/graph/types';
import type { AdjacencyList } from '@magic/graph/useAdjacencyList';
import { gcd, lowestPrimeFactor } from '@utils/math';

import { computed } from 'vue';
import type { Ref } from 'vue';

/**
 * because we dont know how many possible paths
 * we can take back to the start node, we must continue
 * to evaluate a path even if we discover a cycle.
 * to ensure we dont run forever, we limit the number of
 * times we can visit a node to this constant
 */
const MAX_VISITATIONS = 100;

/**
 * `stepsToStart` is an array of the number of steps it took / distance for a path
 * to return to the start node. since there may be several paths, we keep
 * track of all of them.
 *
 * @param startNodeId the node to start the path search from
 * @param adjacencyMap the adjacency map of the component
 * @returns an array of the number of steps it took for a path to return to the start node
 */
const getStepsToStart = (
  adjacencyList: AdjacencyList,
  startNodeId: GNode['id'],
) => {
  /**
   * a queue of nodes to visit and the number of steps it took to get there
   */
  const queue: [GNode['id'], number][] = [[startNodeId, 0]];

  /**
   * keeps tabs on the number of times a node has been visited
   * in order to terminate a path after `MAX_VISITATIONS` times
   */
  const visited: Map<GNode['id'], number> = new Map();

  /**
   * tabulates the number of steps it took for a discovered path
   * to return to the start node. since there may be several paths,
   * we keep track of all of them.
   *
   * [1, 2, 3] means there are 3 paths that took 1, 2, and 3 steps
   */
  const stepsToStart = new Set<number>();

  while (queue.length > 0) {
    const [nodeId, steps] = queue.shift()!;

    if (visited.get(nodeId) === MAX_VISITATIONS) {
      continue;
    }

    if (nodeId === startNodeId && steps > 0) {
      stepsToStart.add(steps);
    }

    const visitedEntry = visited.get(nodeId) ?? 0;
    visited.set(nodeId, visitedEntry + 1);

    for (const child of adjacencyList[nodeId]) {
      queue.push([child, steps + 1]);
    }
  }

  return stepsToStart;
};

const getPeriod = (
  adjacencyList: AdjacencyList,
  recurrentClass: Set<GNode['id']>,
) => {
  if (recurrentClass.size === 1) return 1;

  const startNodeId = recurrentClass.values().next().value;
  if (!startNodeId) throw new Error('recurrent class is empty');

  const stepsToStart = getStepsToStart(adjacencyList, startNodeId);

  if (stepsToStart.size === 0) throw new Error('no path found to start node');

  const period = Array.from(stepsToStart).reduce((acc, curr) => gcd(acc, curr));
  return lowestPrimeFactor(period);
};

/**
 * reactive periodicity of a markov chain
 *
 * @param graph the graph to analyze
 * @param recurrentClasses the recurrent classes of the graph
 * @returns an object containing the periods of each recurrent class and
 * whether or not the markov chain is periodic
 */
export const useMarkovPeriodicity = (
  graph: Graph,
  recurrentClasses: Ref<Set<GNode['id']>[]>,
) => {
  const { adjacencyList } = graph.adjacencyList;

  const recurrentClassPeriods = computed(() => {
    const res = recurrentClasses.value.map((recurrentClass) =>
      getPeriod(adjacencyList.value, recurrentClass),
    );
    return res;
  });

  const isPeriodic = computed(() => {
    return recurrentClassPeriods.value.some((period) => period > 1);
  });

  return {
    /**
     * an array of periods for each recurrent class
     * @example [2, 3, 4] // class 0 has a period of 2, 1 has 3, etc.
     */
    recurrentClassPeriods,
    /**
     * whether or not the markov chain in the graph is periodic
     */
    isPeriodic,
  };
};

export type MarkovPeriodicity = ReturnType<typeof useMarkovPeriodicity>;
