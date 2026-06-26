import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import { USETHEME_ID } from '../constants.ts';
import type { MarkovChain } from '../markov/useMarkovChain.ts';

export const usePeriodicityLabels = (graph: Graph, markov: MarkovChain) => {
  const { set, remove } = graph.canvas.theme.createLayer(USETHEME_ID);
  const { recurrentClassPeriods, nodeIdToRecurrentClassIndex } = markov;

  const nodeText = ({ id }: { id: string }) => {
    if (graph.focus.isFocused(id)) return;
    const recurrentClassIndex = nodeIdToRecurrentClassIndex.value.get(id);
    if (recurrentClassIndex === undefined) return;
    return recurrentClassPeriods.value[recurrentClassIndex].toString();
  };

  const label = () => {
    set('node.default.text.content', nodeText);
  };

  const unlabel = () => {
    remove('node.default.text.content');
  };

  return {
    label,
    unlabel,
  };
};
