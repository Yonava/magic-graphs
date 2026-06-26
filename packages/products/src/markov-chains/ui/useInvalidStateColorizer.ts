import colors from '@magic/utils/colors';

import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { MarkovChain } from '../markov/useMarkovChain.ts';

const USETHEME_ID = 'markov-invalid-state';

export const useInvalidStateColorizer = (graph: Graph, markov: MarkovChain) => {
  const canvas = graph.canvas.theme.createLayer(USETHEME_ID);
  const anchors = graph.anchors.theme.createLayer(USETHEME_ID);

  const { invalidStates, nodeIdToOutgoingWeight } = markov;

  const nodeBorderColor = ({ id }: { id: string }) => {
    if (graph.focus.isFocused(id)) return;
    if (invalidStates.value.has(id)) return colors.RED_600;
    return colors.GREEN_600;
  };

  const nodeText = ({ id }: { id: string }) => {
    if (graph.focus.isFocused(id)) return;
    const sum = nodeIdToOutgoingWeight.value.get(id);
    if (sum === undefined) return '?';
    return sum.simplify(0.001).toFraction();
  };

  const colorize = () => {
    canvas.set('node.default.border.color', nodeBorderColor);
    anchors.set('anchors.default.color', nodeBorderColor);
    canvas.set('node.default.text.content', nodeText);
  };

  const decolorize = () => {
    canvas.removeAll();
    anchors.removeAll();
  };

  return {
    colorize,
    decolorize,
  };
};
