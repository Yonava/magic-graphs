
import { useSCCColorizer } from '../../sandbox/ui/GraphInfoMenu/useSCCColorizer.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import { USETHEME_ID } from '../constants.ts';
import type { MarkovChain } from '../markov/useMarkovChain.ts';

export const useMarkovColorizer = (graph: Graph, markov: MarkovChain) => {
  const sccColorizer = useSCCColorizer(graph, 'default-markov-scc-colors');

  const { set, remove } = graph.canvas.theme.createLayer(USETHEME_ID);

  const colorNodeBorder = ({ id }: { id: string }) => {
    if (graph.focus.isFocused(id))
      return graph.canvas.theme.resolvedPreset.value.node.focus.borderColor;
    if (markov.transientStates.value.has(id))
      return graph.canvas.theme.resolvedPreset.value.node.default.borderColor;
  };

  const colorize = () => {
    sccColorizer.color();
    set('node.default.borderColor', colorNodeBorder);
    set('nodeAnchor.default.color', colorNodeBorder);
  };

  const decolorize = () => {
    sccColorizer.uncolor();
    remove('node.default.borderColor');
    remove('nodeAnchor.default.color');
  };

  return {
    colorize,
    decolorize,
  };
};
