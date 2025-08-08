import type { Graph } from '@graph/types';
import { useSimulationControls } from '@ui/product/sim/useSimulationControls';

import state from './state';
import { useTargetNodeColor } from './theme/useTargetNodeColor';
import type { AVLTree, TreeTraceStep } from './tree/avl';
import { treeArrayToGraph } from './tree/treeArrayToGraph';
import { getTreeTraceExplanation } from './ui/useTreeTraceExplainer';

const ROOT_POS = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

const { simRunner } = state;

type CreateRunnerOptions = {
  graph: Graph;
  tree: AVLTree;
};

/**
 * @returns a function that when called with a trace, populates `simRunner` state and starts the simulation experience
 */
export const createSimulationRunner =
  ({ graph, tree }: CreateRunnerOptions) =>
  (trace: TreeTraceStep[]) => {
    if (simRunner.value)
      throw 'attempted to start a simulation during running simulation';

    const { targetNodeId, activate, deactivate } = useTargetNodeColor(graph);
    activate();

    const runStep = (step: number) => {
      const traceAtStep = trace[step];
      if (traceAtStep === undefined) return;

      targetNodeId.value = undefined;

      if (traceAtStep.action === 'compare') {
        const { comparedNode: treeNodeKey } = traceAtStep;
        targetNodeId.value = treeNodeKey.toString();
      }

      if (traceAtStep.action === 'insert' || traceAtStep.action === 'remove') {
        const { targetNode: target } = traceAtStep;
        targetNodeId.value = target.toString();
      }

      treeArrayToGraph(graph, traceAtStep.treeState, tree.root!, ROOT_POS);
    };

    const simControls = useSimulationControls(trace, {
      explanation: getTreeTraceExplanation,
      pauseOnStructureChange: false,
      defaultPlaybackSpeedMs: 1500,
      showPlaybackSpeedControls: false,
    });

    simControls.onStepChange(runStep);

    const stop = () => {
      if (!simRunner.value) throw 'simRunner state erased w/o stop method!';
      deactivate();
      const {
        stop: stopPlayback,
        setStep,
        lastStep,
      } = simRunner.value.simControls;
      setStep(lastStep.value);
      stopPlayback();
      simRunner.value = undefined;
    };

    simRunner.value = {
      start: simControls.start,
      stop,
      simControls,
    };

    simRunner.value.start();
  };
