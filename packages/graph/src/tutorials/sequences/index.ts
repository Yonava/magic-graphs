import { BASICS_STEPS } from '../../tutorials/sequences/basics.ts';
import type { TutorialSequence } from '../../tutorials/types.ts';
import type { Graph } from '../../types.ts';

/**
 * pre-defined sequence for basic graph editing.
 * re-arrange the steps to change the order of the tutorial
 */
const BASICS_SEQUENCE: (graph: Graph) => TutorialSequence = (graph: Graph) => {
  const {
    greeting,
    createNode,
    moveNode,
    createEdge,
    createUndirectedEdge,
    // createSelfDirectedEdge,
    editEdgeWeight,
    removeElement,
    goodbye,
  } = BASICS_STEPS(graph);

  return [
    greeting,
    createNode,
    moveNode,
    createEdge,
    createUndirectedEdge,
    // createSelfDirectedEdge,
    editEdgeWeight,
    removeElement,
    goodbye,
  ];
};

/**
 * contains pre-defined sequences for common use cases
 */
export const SEQUENCES: (graph: Graph) => Record<string, TutorialSequence> = (
  graph: Graph,
) => ({
  basics: BASICS_SEQUENCE(graph),
});
