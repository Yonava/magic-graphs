import { useTheme } from '@graph/themes/useTheme';
import type { GNode, Graph } from '@graph/types';

import { USETHEME_ID } from '../constants';
import type { MarkovChain } from '../markov/useMarkovChain';

export const usePeriodicityLabels = (graph: Graph, markov: MarkovChain) => {
  const { setTheme, removeTheme } = useTheme(graph, USETHEME_ID);
  const { recurrentClassPeriods, nodeIdToRecurrentClassIndex } = markov;

  const nodeText = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    const recurrentClassIndex = nodeIdToRecurrentClassIndex.value.get(node.id);
    if (recurrentClassIndex === undefined) return;
    return recurrentClassPeriods.value[recurrentClassIndex].toString();
  };

  const label = () => {
    setTheme('nodeText', nodeText);
  };

  const unlabel = () => {
    removeTheme('nodeText');
  };

  return {
    label,
    unlabel,
  };
};
