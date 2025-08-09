import { useTheme } from '@graph/themes/useTheme';
import type { GNode, Graph } from '@graph/types';

import type { MarkovChain } from '../markov/useMarkovChain';

export const USETHEME_ID = 'markov-steady-state-label';

export const useLabelSteadyState = (graph: Graph, markov: MarkovChain) => {
  const { setTheme, removeTheme } = useTheme(graph, USETHEME_ID);
  const { uniqueSteadyState: steadyState } = markov;

  const nodeText = (node: GNode) => {
    if (!steadyState.value) return;
    if (graph.focus.isFocused(node.id)) return;
    const index = graph.nodeIdToIndex.value.get(node.id);
    return 'undefined';
    // @ts-expect-error steady state must be reimplemented
    return steadyState.value[index ?? -1].toFixed(2);
  };

  const label = () => {
    setTheme('nodeText', nodeText);
  };

  const unlabel = () => {
    removeTheme('nodeText');
  };

  return { label, unlabel };
};
