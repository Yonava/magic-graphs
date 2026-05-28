import { SEQUENCES } from '../tutorials/sequences/index.ts';
import { useGraphTutorial } from '../tutorials/useGraphTutorial.ts';
import type { Graph } from '../types.ts';

/**
 * implements useGraphTutorial with the basics tutorial sequence
 * for educating users on basic graph UI interactions
 *
 * @param graph the useGraph instance to apply the tutorial to
 * @returns an object containing controls for the tutorial
 */
export const useBasicsTutorial = (graph: Graph) =>
  useGraphTutorial(graph, SEQUENCES(graph).basics);
