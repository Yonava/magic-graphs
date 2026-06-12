import type { GNode } from '@magic/graph/types';
import colors from '@magic/utils/colors';

import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { MarkovChain } from '../markov/useMarkovChain.ts';

const USETHEME_ID = 'markov-invalid-state';

export const useInvalidStateColorizer = (graph: Graph, markov: MarkovChain) => {
  const { set, removeAll } = graph.canvas.theme.createLayer(USETHEME_ID);

  const { invalidStates, nodeIdToOutgoingWeight } = markov;

  const nodeBorderColor = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    if (invalidStates.value.has(node.id)) return colors.RED_600;
    return colors.GREEN_600;
  };

  const nodeText = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    const sum = nodeIdToOutgoingWeight.value.get(node.id);
    if (sum === undefined) return '?';
    return sum.simplify(0.001).toFraction();
  };

  const colorize = () => {
    set('node.default.borderColor', nodeBorderColor);
    set('nodeAnchor.default.color', nodeBorderColor);
    set('node.default.text', nodeText);
  };

  const decolorize = () => {
    removeAll();
  };

  return {
    colorize,
    decolorize,
  };
};
