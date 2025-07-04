import { computed, ref } from 'vue';
import type { Graph } from '@graph/types';
import { useTargetNodeColor } from './theme/useTargetNodeColor';
import { treeArrayToGraph } from './tree/treeArrayToGraph';
import type { AVLTree, TreeTrace } from './tree/avl';
import state from './state';

const ROOT_POS = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

const { activeSim } = state;

type SetTreeSimOptions = {
  graph: Graph;
  tree: AVLTree;
  trace: TreeTrace[];
};

export const setTreeSim = (
  recomputeMaps: () => void
) => (
  { graph, tree, trace }: SetTreeSimOptions
) => {
    const { targetNodeId, activate } = useTargetNodeColor(graph);
    activate();

    const step = ref(0);

    const runStep = () => {
      const traceAtStep = trace[step.value];
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

      recomputeMaps();
    };

    runStep();

    const next = async () => {
      ++step.value;
      await runStep();
    };

    const prev = async () => {
      --step.value;
      await runStep();
    };

    const exit = async () => {
      if (step.value !== trace.length - 1) {
        step.value = trace.length - 1;
        runStep();
      }
      activeSim.value = undefined;
      targetNodeId.value = undefined;
    };

    activeSim.value = {
      step: computed(() => step.value),
      next,
      prev,
      exit,
      trace: computed(() => trace),
    };
  };
