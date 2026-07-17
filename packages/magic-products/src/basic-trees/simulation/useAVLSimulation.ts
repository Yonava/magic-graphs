import { useProvidedGraph } from '@magic/shared/product';
import { SimulationDefinition } from '@magic/shared/simulation';

import { Ref, ref } from 'vue';

import { AVLTree } from '../avl.ts';
import { TreeNode } from './TreeNode.ts';
import { AVLFrame, AVLMode } from './types.ts';

type Controls = {
  mode: Ref<AVLMode>;
  targetNodeValue: Ref<number>;
  definition: SimulationDefinition<AVLFrame>;
};

export const useAVLSimulationDefinition = (initialTarget: number): Controls => {
  const graph = useProvidedGraph();

  const targetNodeValue = ref(initialTarget);
  const mode = ref<AVLMode>('insert');
  const treeRoot = ref<TreeNode | undefined>();

  const definition: SimulationDefinition<AVLFrame> = {
    collectFrames: (collector) => {
      const treeInstance = new AVLTree(treeRoot.value, collector);
      if (mode.value === 'insert') {
        const root = treeInstance.insert(targetNodeValue.value);
        treeRoot.value = root;
      } else if (mode.value === 'remove') {
        const root = treeInstance.remove(targetNodeValue.value);
        treeRoot.value = root;
      }
    },
    setup: () => {
      return {
        explainer: (frame) => ({
          content: frame.action,
        }),
      };
    },
  };

  return {
    targetNodeValue,
    mode,
    definition,
  };
};
