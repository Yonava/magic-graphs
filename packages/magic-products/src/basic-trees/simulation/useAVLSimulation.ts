import { nullThrows } from '@core/utils/assert';
import { useProvidedGraph } from '@magic/shared/product';
import { Explainer, SimulationDefinition } from '@magic/shared/simulation';
import { useNodeThemer } from '@magic/shared/themer';

import { Ref, ref } from 'vue';

import { AVLTree } from '../AVLTree.ts';
import { treeArrayToGraph } from './treeArrayToGraph.ts';
import { AVLFrame, AVLMode, BalanceMethod } from './types.ts';

const ROOT_POSITION = {
  x: 800,
  y: 400,
};

type Controls = {
  mode: Ref<AVLMode>;
  targetNodeValue: Ref<number>;
  definition: SimulationDefinition<AVLFrame>;
};

const BALANCE_METHOD_TO_STRING: Record<BalanceMethod, string> = {
  'left-left': 'Left Left',
  'left-right': 'Left Right',
  'right-left': 'Right Left',
  'right-right': 'Right Right',
};

const BALANCE_METHOD_TO_DEFINITION: Record<BalanceMethod, string> = {
  'left-left':
    'The node is left-heavy and its left child is also left-heavy (or balanced). A single right rotation on the node restores balance.',
  'left-right':
    'The node is left-heavy but its left child is right-heavy. A left rotation on the left child followed by a right rotation on the node restores balance.',
  'right-left':
    'The node is right-heavy but its right child is left-heavy. A right rotation on the right child followed by a left rotation on the node restores balance.',
  'right-right':
    'The node is right-heavy and its right child is also right-heavy (or balanced). A single left rotation on the node restores balance.',
};

export const useAVLSimulationDefinition = (initialTarget: number): Controls => {
  const graph = useProvidedGraph();

  const targetNodeValue = ref(initialTarget);
  const mode = ref<AVLMode>('insert');

  const { themer, nodeId } = useNodeThemer(graph);

  const tree = new AVLTree();

  const sync = (frame: AVLFrame) => {
    graph.actions.removeElements(
      {
        nodes: graph.nodes.value,
        edges: [],
      },
      {},
    );

    const graphState = treeArrayToGraph(frame.root, ROOT_POSITION);

    if (frame.action === 'compare') {
      const node = frame.targetNode;
      const compareNode = nullThrows(
        graphState.nodes.find((n) => n.id === frame.comparedNode.toString()),
        'comparator node not found',
      );
      const compareNodeX = nullThrows(
        compareNode.position?.x,
        'compare node missing X',
      );
      const compareNodeY = nullThrows(
        compareNode.position?.y,
        'compare node missing Y',
      );
      graphState.nodes.push({
        id: node.toString(),
        label: node.toString(),
        position: {
          x: compareNodeX - 100,
          y: compareNodeY,
        },
      });
    }

    graph.actions.addElements(graphState, { focus: false });
  };

  const getExplanation = (frame: AVLFrame): Explainer | undefined => {
    if (frame.action === 'compare') {
      return {
        content: `Comparing [${frame.targetNode}] to [${frame.comparedNode}]`,
        highlights: [
          {
            activate: () => {
              nodeId.value = frame.targetNode.toString();
              themer.activate();
            },
            deactivate: themer.deactivate,
          },
          {
            activate: () => {
              nodeId.value = frame.comparedNode.toString();
              themer.activate();
            },
            deactivate: themer.deactivate,
          },
        ],
      };
    }
    if (frame.action === 'balance') {
      return {
        content: `This Tree Unbalanced! Performing a [${BALANCE_METHOD_TO_STRING[frame.method]}] Balancing Maneuver`,
        highlights: [
          {
            tooltipLabel: BALANCE_METHOD_TO_DEFINITION[frame.method],
          },
        ],
      };
    }
    if (frame.action === 'insert') {
      return {
        content: `Inserting [${frame.targetNode}]`,
        highlights: [
          {
            activate: () => {
              nodeId.value = frame.targetNode.toString();
              themer.activate();
            },
            deactivate: themer.deactivate,
          },
        ],
      };
    }
    if (frame.action === 'remove') {
      return {
        content: `Removing [${frame.targetNode}]`,
        highlights: [{}],
      };
    }
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
        explainer: getExplanation,
        onSetupCompleted: () => sync(currentFrame.value),
        onFrameTransition: () => sync(currentFrame.value),
        onBeforeTeardown: () =>
          sync(nullThrows(frames.value.at(-1), 'last frame undefined')),
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
