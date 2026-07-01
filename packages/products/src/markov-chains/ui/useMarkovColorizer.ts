import { useSCCColorizer } from '../../sandbox/ui/GraphInfoMenu/useSCCColorizer.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import { USETHEME_ID } from '../constants.ts';
import type { MarkovChain } from '../markov/useMarkovChain.ts';

export const useMarkovColorizer = (graph: Graph, markov: MarkovChain) => {
  const sccColorizer = useSCCColorizer(graph, 'default-markov-scc-colors');

  const canvas = graph.canvas.theme.createLayer(USETHEME_ID);
  const anchors = graph.anchors.theme.createLayer(USETHEME_ID);

  const fallbackIfTransient = (
    node: { id: string },
    resolveUnderneath: () => string,
  ) => {
    const isTransient = markov.transientStates.value.has(node.id);
    if (isTransient) return resolveUnderneath();
  };

  const colorize = () => {
    sccColorizer.color();
    canvas.set('node.default.border.color', fallbackIfTransient);
    anchors.set('anchors.default.color', fallbackIfTransient);
  };

  const decolorize = () => {
    sccColorizer.uncolor();
    canvas.remove('node.default.border.color');
    anchors.remove('anchors.default.color');
  };

  return {
    colorize,
    decolorize,
  };
};
