import { computed } from "vue";
import type { GNode, Graph } from "@graph/types";
import { useTheme } from "@graph/themes/useTheme";
import type { SimulationControls } from "@ui/product/sim/types";
import type { MarkovChainTrace } from "./runner";

const USETHEME_ID = 'markov-chain-sim'

export const useSimulationTheme = (
  graph: Graph,
  simControls: SimulationControls<MarkovChainTrace>
) => {
  const { setTheme, removeAllThemes } = useTheme(graph, USETHEME_ID);
  const { trace, step } = simControls;
  const { nodeIdToIndex } = graph;

  const traceAtStep = computed(() => trace.value(step.value))

  const nodeText = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return

    const index = nodeIdToIndex.value.get(node.id);
    if (index === undefined) return;

    return traceAtStep.value[index].simplify(0.001).toFraction();
  }

  const nodeTextSize = (node: GNode) => {
    const defaultSize = graph.baseTheme.value.nodeTextSize;
    if (graph.focus.isFocused(node.id)) return;
    return defaultSize - 5;
  }

  const theme = () => {
    setTheme('nodeText', nodeText);
    setTheme('nodeTextSize', nodeTextSize);
  }

  const untheme = () => {
    removeAllThemes();
  }

  return {
    theme,
    untheme
  }
}