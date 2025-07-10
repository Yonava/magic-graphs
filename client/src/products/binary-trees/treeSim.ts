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

export const setTreeSim = () => (
  { graph, tree, trace }: SetTreeSimOptions
) => {
  const { targetNodeId, activate } = useTargetNodeColor(graph);
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

  // const exit = () => {
  //   if (step.value !== trace.length - 1) {
  //     step.value = trace.length - 1;
  //     runStep();
  //   }
  //   activeSim.value = undefined;
  //   targetNodeId.value = undefined;
  // };

  const controls = useSimulationControls(trace)

  controls.start()

  controls.onStepChange(runStep)

  activeSim.value = controls
};
