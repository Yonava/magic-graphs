import { useTheme } from '@magic/graph/themes/useTheme';
import type { GNode, Graph } from '@magic/graph/types';

import type { SimulationControls } from '../../shared/ui/general/sim/types.ts';
import type { MarkovChainTrace } from './runner';

const USETHEME_ID = 'markov-chain-sim';

export const useSimulationTheme = (
  graph: Graph,
  simControls: SimulationControls<ReturnType<MarkovChainTrace>>,
) => {
  const { setTheme, removeAllThemes } = useTheme(graph, USETHEME_ID);
  const { traceAtStep } = simControls;
  const { nodeIdToIndex } = graph;

  const nodeText = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;

    const index = nodeIdToIndex.value.get(node.id);
    if (index === undefined) return;

    return traceAtStep.value[index].simplify(0.001).toFraction();
  };

  const nodeTextSize = (node: GNode) => {
    const defaultSize = graph.baseTheme.value.node.base.textSize;
    if (graph.focus.isFocused(node.id)) return;
    return defaultSize - 5;
  };

  const theme = () => {
    setTheme('node.base.text', nodeText);
    setTheme('node.base.textSize', nodeTextSize);
  };

  const untheme = () => {
    removeAllThemes();
  };

  return {
    theme,
    untheme,
  };
};
