import { useTheme } from '@magic/graph/themes/useTheme';
import type { GNode } from '@magic/graph/types';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';

import { useSCCColorizer } from '../../sandbox/ui/GraphInfoMenu/useSCCColorizer.ts';
import { USETHEME_ID } from '../constants.ts';
import type { MarkovChain } from '../markov/useMarkovChain.ts';

export const useMarkovColorizer = (graph: Graph, markov: MarkovChain) => {
  const sccColorizer = useSCCColorizer(graph, 'default-markov-scc-colors');

  const { setTheme, removeTheme } = useTheme(graph, USETHEME_ID);

  const colorNodeBorder = (node: GNode) => {
    if (graph.focus.isFocused(node.id))
      return graph.baseTheme.value.node.focus.borderColor;
    if (markov.transientStates.value.has(node.id))
      return graph.baseTheme.value.node.base.borderColor;
  };

  const colorize = () => {
    sccColorizer.color();
    setTheme('node.base.borderColor', colorNodeBorder);
    setTheme('nodeAnchor.base.color', colorNodeBorder);
  };

  const decolorize = () => {
    sccColorizer.uncolor();
    removeTheme('node.base.borderColor');
    removeTheme('nodeAnchor.base.color');
  };

  return {
    colorize,
    decolorize,
  };
};
