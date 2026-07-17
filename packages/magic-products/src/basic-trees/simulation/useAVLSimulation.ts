import { nullThrows } from '@core/utils/assert';
import { generateId } from '@core/utils/id';
import { useProvidedGraph } from '@magic/shared/product';
import { SimulationDefinition } from '@magic/shared/simulation';

import { Ref, computed, ref } from 'vue';

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

  const sync = () => {
    graph.actions.removeElements(
      {
        nodes: graph.nodes.value,
        edges: [],
      },
      {},
    );

    const nodesInTree = tree.toArray();
    const definedNodes = nodesInTree.filter((v) => v !== undefined);

    const newMap: Map<string, number> = new Map();

    const newNodes = definedNodes.map((v) => ({
      label: v.toString(),
      id: generateId(),
    }));

    for (const node of newNodes) {
      newMap.set(node.id, Number(node.label));
    }

    nodeIdToValue.value = newMap;

    graph.actions.addElements(
      {
        nodes: newNodes,
        edges: [],
      },
      { focus: false },
    );
  };

  const definition: SimulationDefinition<AVLFrame> = {
    collectFrames: (collector) => {
      tree.attachCollector(collector);
      if (mode.value === 'insert') {
        tree.insert(targetNodeValue.value);
      } else {
        tree.remove(targetNodeValue.value);
      }
    },
    setup: () => {
      return {
        explainer: (frame) => ({
          content: frame.action,
        }),
      };
    },
    onSetupCompleted: sync,
    onFrameTransition: sync,
    onTeardownCompleted: sync,
    recomputeFramesOnStructureChange: false,
  };

  return {
    targetNodeValue,
    mode,
    definition,
    nodeValue,
  };
};
