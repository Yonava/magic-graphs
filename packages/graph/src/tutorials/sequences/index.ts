import { GraphCoreControls } from '../../core/types.ts';
import { CanvasPlugin } from '../../plugins/canvas/types.ts';
import { BASICS_STEPS } from '../../tutorials/sequences/basics.ts';
import type { TutorialSequence } from '../../tutorials/types.ts';

type TutorialGraph = GraphCoreControls & CanvasPlugin;

/**
 * pre-defined sequence for basic graph editing.
 * re-arrange the steps to change the order of the tutorial
 */
const BASICS_SEQUENCE: (graph: TutorialGraph) => TutorialSequence = (
  graph: TutorialGraph,
) => {
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
export const SEQUENCES: (
  graph: TutorialGraph,
) => Record<string, TutorialSequence> = (graph: TutorialGraph) => ({
  basics: BASICS_SEQUENCE(graph),
});
