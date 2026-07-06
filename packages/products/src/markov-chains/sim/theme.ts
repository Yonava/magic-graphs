import { getValue } from '@magic/utils/maybeGetter/index';

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

  const nodeText = ({ id }: { id: string }) => {
    if (graph.focus.isFocused(id)) return;

    const index = nodeIdToIndex(id);
    if (index === undefined) return;

    return traceAtStep.value[index].simplify(0.001).toFraction();
  };

  const theme = () => {
    set('node.default.text.content', nodeText);
    set('node.default.text.size', (_, resolveUnderneath) => {
      return resolveUnderneath() - 5;
    });
  };

  const untheme = () => {
    removeAll();
  };

  return {
    theme,
    untheme,
  };
};
