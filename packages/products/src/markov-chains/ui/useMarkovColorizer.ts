import { useTheme } from '@magic/graph/themes/useTheme';
import type { GNode } from '@magic/graph/types';

import { useSCCColorizer } from '../../sandbox/ui/GraphInfoMenu/useSCCColorizer.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import { USETHEME_ID } from '../constants.ts';
import type { MarkovChain } from '../markov/useMarkovChain.ts';

export const useMarkovColorizer = (graph: Graph, markov: MarkovChain) => {
  const sccColorizer = useSCCColorizer(graph, 'default-markov-scc-colors');

  const { setTheme, removeTheme } = useTheme(graph, USETHEME_ID);

  const colorNodeBorder = (node: GNode) => {
    if (graph.focus.isFocused(node.id))
      return graph.canvas.baseTheme.value.node.focus.borderColor;
    if (markov.transientStates.value.has(node.id))
      return graph.canvas.baseTheme.value.node.default.borderColor;
  };

  const colorize = () => {
    sccColorizer.color();
    setTheme('node.default.borderColor', colorNodeBorder);
    setTheme('nodeAnchor.default.color', colorNodeBorder);
  };

  const decolorize = () => {
    sccColorizer.uncolor();
    removeTheme('node.default.borderColor');
    removeTheme('nodeAnchor.default.color');
  };

  return {
    colorize,
    decolorize,
  };
};
