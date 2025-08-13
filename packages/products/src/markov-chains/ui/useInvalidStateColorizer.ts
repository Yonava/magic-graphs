import { useTheme } from '@magic/graph/themes/useTheme';
import type { GNode, Graph } from '@magic/graph/types';
import colors from '@utils/colors';

import type { MarkovChain } from '../markov/useMarkovChain';

const USETHEME_ID = 'markov-invalid-state';

export const useInvalidStateColorizer = (graph: Graph, markov: MarkovChain) => {
  const { setTheme, removeAllThemes } = useTheme(graph, USETHEME_ID);

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
    setTheme('nodeBorderColor', nodeBorderColor);
    setTheme('nodeAnchorColor', nodeBorderColor);
    setTheme('nodeText', nodeText);
  };

  const decolorize = () => {
    removeAllThemes();
  };

  return {
    colorize,
    decolorize,
  };
};
