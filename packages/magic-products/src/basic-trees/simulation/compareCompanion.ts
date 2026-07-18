import { nullThrows } from '@core/utils/assert';

import { GraphState } from './treeArrayToGraph.ts';
import { CompareFrame } from './types.ts';

export const compareCompanion = (frame: CompareFrame, state: GraphState) => {
  const node = frame.targetNode;
  const compareNode = nullThrows(
    state.nodes.find((n) => n.id === frame.comparedNode.toString()),
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
  state.nodes.push({
    id: node.toString() + '-compare',
    label: node.toString(),
    position: {
      x: compareNodeX - 100,
      y: compareNodeY,
    },
  });
};
