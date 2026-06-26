import { getValue } from '@magic/utils/maybeGetter/index';

import { useSCCColorizer } from '../../sandbox/ui/GraphInfoMenu/useSCCColorizer.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import { USETHEME_ID } from '../constants.ts';
import type { MarkovChain } from '../markov/useMarkovChain.ts';

export const useMarkovColorizer = (graph: Graph, markov: MarkovChain) => {
  const sccColorizer = useSCCColorizer(graph, 'default-markov-scc-colors');

  const canvas = graph.canvas.theme.createLayer(USETHEME_ID);
  const anchors = graph.anchors.theme.createLayer(USETHEME_ID);

  const colorNodeBorder = (node: { id: string }) => {
    const preset = graph.theme.activePreset();
    const focusBorderColor = getValue(
      preset.focus['node.focus.border.color'],
      node,
    )!;
    const defaultBorderColor = getValue(
      preset.canvas['node.default.border.color'],
      node,
    )!;

    if (graph.focus.isFocused(node.id)) return focusBorderColor;
    if (markov.transientStates.value.has(node.id)) return defaultBorderColor;
  };

  const colorize = () => {
    sccColorizer.color();
    canvas.set('node.default.border.color', colorNodeBorder);
    anchors.set('anchors.default.color', colorNodeBorder);
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
