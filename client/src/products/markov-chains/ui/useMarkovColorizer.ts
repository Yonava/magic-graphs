import { useTheme } from '@graph/themes/useTheme';
import type { GNode, Graph } from '@graph/types';
import { useSCCColorizer } from '@product/sandbox/ui/GraphInfoMenu/useSCCColorizer';
import type { MarkovChain } from '../markov/useMarkovChain';
import { USETHEME_ID } from '../constants';

export const useMarkovColorizer = (graph: Graph, markov: MarkovChain) => {
  const sccColorizer = useSCCColorizer(graph);

  const { setTheme, removeTheme } = useTheme(graph, USETHEME_ID);

  const colorNodeBorder = (node: GNode) => {
    if (graph.focus.isFocused(node.id))
      return graph.baseTheme.value.nodeFocusBorderColor;
    if (markov.transientStates.value.has(node.id))
      return graph.baseTheme.value.nodeBorderColor;
  };

  const colorize = () => {
    sccColorizer.colorize();
    setTheme('nodeBorderColor', colorNodeBorder);
    setTheme('nodeAnchorColor', colorNodeBorder);
  };

  const decolorize = () => {
    sccColorizer.decolorize();
    removeTheme('nodeBorderColor');
    removeTheme('nodeAnchorColor');
  };

  return {
    colorize,
    decolorize,
  };
};
