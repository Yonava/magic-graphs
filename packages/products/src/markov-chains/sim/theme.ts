import type { GNode } from '@magic/graph/types';

import type { SimulationControls } from '../../shared/ui/general/sim/types.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { MarkovChainTrace } from './runner.ts';

const USETHEME_ID = 'markov-chain-sim';

export const useSimulationTheme = (
  graph: Graph,
  simControls: SimulationControls<ReturnType<MarkovChainTrace>>,
) => {
  const { set, removeAll } = graph.canvas.theme.createLayer(USETHEME_ID);
  const { traceAtStep } = simControls;
  const { nodeIdToIndex } = graph;

  const nodeText = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;

    const index = nodeIdToIndex.value.get(node.id);
    if (index === undefined) return;

    return traceAtStep.value[index].simplify(0.001).toFraction();
  };

  const nodeTextSize = (node: GNode) => {
    const defaultSize = graph.canvas.theme.base.value.node.default.textSize;
    if (graph.focus.isFocused(node.id)) return;
    return defaultSize - 5;
  };

  const theme = () => {
    set('node.default.text', nodeText);
    set('node.default.textSize', nodeTextSize);
  };

  const untheme = () => {
    removeAll();
  };

  return {
    theme,
    untheme,
  };
};
