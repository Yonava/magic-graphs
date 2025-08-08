import { useTheme } from '@graph/themes/useTheme';
import type { GNode, Graph } from '@graph/types';
import colors from '@utils/colors';

import type { MarkovChain } from '../markov/useMarkovChain';

const USETHEME_ID = 'markov-illegal-state';

export const useIllegalStateColorizer = (graph: Graph, markov: MarkovChain) => {
  const { setTheme, removeAllThemes } = useTheme(graph, USETHEME_ID);

  const { illegalNodeIds, nodeIdToOutgoingWeight } = markov;

  const nodeBorderColor = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    if (illegalNodeIds.value.has(node.id)) return colors.RED_600;
    return colors.GREEN_600;
  };

  const nodeText = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    const sum = nodeIdToOutgoingWeight.value.get(node.id);
    if (sum === undefined) return '?';
    return sum.simplify(0.001).toFraction();
  };

  const nodeTextSize = (node: GNode) => {
    const defaultSize = graph.baseTheme.value.nodeTextSize;
    if (graph.focus.isFocused(node.id)) return;
    return defaultSize - 5;
  };

  const colorize = () => {
    setTheme('nodeBorderColor', nodeBorderColor);
    setTheme('nodeAnchorColor', nodeBorderColor);
    setTheme('nodeText', nodeText);
    setTheme('nodeTextSize', nodeTextSize);
  };

  const decolorize = () => {
    removeAllThemes();
  };

  return {
    colorize,
    decolorize,
  };
};
