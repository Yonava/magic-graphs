import { nullThrows } from '@core/utils/assert';
import { useProvidedGraph } from '@magic/shared/product';
import { SimulationDefinition } from '@magic/shared/simulation';

import { Ref, ref } from 'vue';

import { AVLTree } from '../AVLTree.ts';
import { AVLFrame, AVLMode } from './types.ts';

type Controls = {
  mode: Ref<AVLMode>;
  targetNodeValue: Ref<number>;
  definition: SimulationDefinition<AVLFrame>;
  nodeValue: (nodeId: string) => number;
};

export const useAVLSimulationDefinition = (initialTarget: number): Controls => {
  const graph = useProvidedGraph();

  const targetNodeValue = ref(initialTarget);
  const mode = ref<AVLMode>('insert');

  const tree = new AVLTree();

  const nodeIdToValue = ref<Map<string, number>>(new Map());

  const nodeValue = (nodeId: string) =>
    nullThrows(nodeIdToValue.value.get(nodeId), 'no value found!');

  const definition: SimulationDefinition<AVLFrame> = {
    collectFrames: (collector) => {
      tree.attachCollector(collector);
      if (mode.value === 'insert') {
        tree.insert(targetNodeValue.value);
      } else {
        tree.remove(targetNodeValue.value);
      }
    },
    onFrameTransition: () => {
      graph.actions.removeElements(
        {
          nodes: graph.nodes.value,
          edges: [],
        },
        {},
      );

      const nodesInTree = tree.toArray();

      graph.actions.addElements(
        {
          nodes: nodesInTree.filter((v) => !!v).map((v) => ({})),
          edges: [],
        },
        {},
      );
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
    nodeValue,
  };
};
