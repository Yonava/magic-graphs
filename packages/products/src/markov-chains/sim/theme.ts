
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

    const index = nodeIdToIndex.value.get(id);
    if (index === undefined) return;

    return traceAtStep.value[index].simplify(0.001).toFraction();
  };

  const nodeTextSize = ({ id }: { id: string }) => {
    const defaultSize =
      graph.canvas.theme.resolvedPreset.value.node.default.textSize;
    if (graph.focus.isFocused(id)) return;
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
