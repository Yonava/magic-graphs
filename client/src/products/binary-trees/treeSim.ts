import type { Graph } from '@graph/types';
import { useTargetNodeColor } from './theme/useTargetNodeColor';
import { treeArrayToGraph } from './tree/treeArrayToGraph';
import type { AVLTree, TreeTraceStep } from './tree/avl';
import state from './state';
import { useSimulationControls } from '@ui/product/sim/useSimulationControls';

const ROOT_POS = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

const { activeSim } = state;

type StartSimOptions = {
  graph: Graph;
  tree: AVLTree;
};

/**
 * @returns a function that when called with a trace, will set `activeSim` thereby starting the simulation experience
 */
export const createSimulationRunner = ({ graph, tree }: StartSimOptions) => (trace: TreeTraceStep[]) => {
  if (activeSim.value) throw 'attempted to start a simulation during running simulation'

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

    treeArrayToGraph(
      graph,
      traceAtStep.treeState,
      tree.root!,
      ROOT_POS,
    );
  };

  const simControls = useSimulationControls(trace)
  simControls.onStepChange(runStep)

  const stop = () => {
    if (!activeSim.value) throw "sim state erased w/o kill method!";
    deactivate();
    const { stop: stopPlayback, setStep, lastStep } = activeSim.value.simControls;
    setStep(lastStep.value);
    stopPlayback();
    activeSim.value = undefined;
  }

  activeSim.value = {
    start: simControls.start,
    stop,
    simControls,
  }

  activeSim.value.start()
};
