import { CoreControls } from '../core/types.ts';
import { CanvasPlugin } from '../plugins/canvas/types.ts';
import { SEQUENCES } from '../tutorials/sequences/index.ts';
import { useGraphTutorial } from '../tutorials/useGraphTutorial.ts';

/**
 * implements useGraphTutorial with the basics tutorial sequence
 * for educating users on basic graph UI interactions
 *
 * @param graph the useGraph instance to apply the tutorial to
 * @returns an object containing controls for the tutorial
 */
export const useBasicsTutorial = (graph: CoreControls & CanvasPlugin) =>
  useGraphTutorial(graph, SEQUENCES(graph).basics);
