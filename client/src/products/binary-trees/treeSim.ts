import type { Graph } from '@graph/types';
import { useTargetNodeColor } from './theme/useTargetNodeColor';
import { treeArrayToGraph } from './tree/treeArrayToGraph';
import type { AVLTree, TreeTrace } from './tree/avl';
import state from './state';
import { useSimulationControls } from '@ui/product/sim/useSimulationControls';

const ROOT_POS = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

const { activeSim } = state;

type SetTreeSimOptions = {
  graph: Graph;
  tree: AVLTree;
  trace: TreeTrace[];
};

export const setTreeSim = () => ({
  graph,
  tree,
  trace,
}: SetTreeSimOptions) => {
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

  const controls = useSimulationControls(trace)
  controls.onStepChange(runStep)
  controls.start()

  activeSim.value = {
    ...controls,
    kill: () => {
      if (!activeSim.value) throw "sim state erased w/o kill method!";
      deactivate();
      const { stop, setStep, lastStep } = activeSim.value;
      setStep(lastStep.value);
      stop();
      activeSim.value = undefined;
    }
  }
};
