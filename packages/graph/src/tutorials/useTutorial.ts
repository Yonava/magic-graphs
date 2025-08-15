import { SEQUENCES } from '../tutorials/sequences';
import { useGraphTutorial } from '../tutorials/useGraphTutorial';
import type { Graph } from '../types';

/**
 * implements useGraphTutorial with the basics tutorial sequence
 * for educating users on basic graph UI interactions
 *
 * @param graph the useGraph instance to apply the tutorial to
 * @returns an object containing controls for the tutorial
 */
export const useBasicsTutorial = (graph: Graph) =>
  useGraphTutorial(graph, SEQUENCES(graph).basics);
