import { nullThrows } from '@core/utils/assert';
import { useProvidedGraph } from '@magic/shared/product';
import { SimulationDefinition } from '@magic/shared/simulation';

import { ComputedRef, Ref, ref } from 'vue';

import { AVLTree } from '../AVLTree.ts';
import { TreeNode } from './TreeNode.ts';
import { treeArrayToGraph } from './treeArrayToGraph.ts';
import { AVLFrame, AVLMode } from './types.ts';

const ROOT_POSITION = {
  x: 800,
  y: 400,
};

type Controls = {
  mode: Ref<AVLMode>;
  targetNodeValue: Ref<number>;
  definition: SimulationDefinition<AVLFrame>;
};

export const useAVLSimulationDefinition = (initialTarget: number): Controls => {
  const graph = useProvidedGraph();

  const targetNodeValue = ref(initialTarget);
  const mode = ref<AVLMode>('insert');

  const tree = new AVLTree();

  const sync = (root: TreeNode | undefined) => {
    graph.actions.removeElements(
      {
        nodes: graph.nodes.value,
        edges: [],
      },
      {},
    );

    const graphState = treeArrayToGraph(root, ROOT_POSITION);

    graph.actions.addElements(graphState, { focus: false });
  };

  const definition: SimulationDefinition<AVLFrame> = {
    collectFrames: (collector) => {
      tree.attachFrameCollector(collector);
      if (mode.value === 'insert') {
        tree.insert(targetNodeValue.value);
      } else {
        tree.remove(targetNodeValue.value);
      }
    },
    setup: (context) => {
      const { currentFrame, frames } = context;
      return {
        explainer: (frame) => ({
          content: frame.action,
        }),
        onSetupCompleted: () => sync(currentFrame.value.root),
        onFrameTransition: () => sync(currentFrame.value.root),
        onBeforeTeardown: () =>
          sync(nullThrows(frames.value.at(-1)?.root, 'last frame undefined')),
      };
    },
    recomputeFramesOnStructureChange: false,
  };

  return {
    targetNodeValue,
    mode,
    definition,
  };
};
