import { useTheme } from '@magic/graph/themes/useTheme';
import type { GNode, Graph } from '@magic/graph/types';
import type { SimulationControls } from '@magic/ui/product/sim/types';
import colors from '@utils/colors';

import type { DijkstrasTraceStep } from '../algo/useDijkstra';

export const SIM_COLORS = {
  SOURCE: colors.AMBER_600,
  EXPLORED: colors.BLUE_500,
  QUEUED: colors.CYAN_500,
} as const;

export const INF_STR = 'Inf';

export const useSimulationTheme = (
  graph: Graph,
  sim: SimulationControls<DijkstrasTraceStep>,
) => {
  const { traceAtStep } = sim;
  const { setTheme, removeAllThemes } = useTheme(graph, 'dijkstra');

  const colorBorders = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    if (traceAtStep.value.currentNode?.id === node.id) return SIM_COLORS.SOURCE;
    if (traceAtStep.value.queue.has(node.id)) return SIM_COLORS.QUEUED;
    if (traceAtStep.value.distances[node.id] !== Infinity)
      return SIM_COLORS.EXPLORED;
  };

  const nodeDistanceText = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    const distance = traceAtStep.value.distances[node.id];
    if (distance === Infinity || distance === undefined) return INF_STR;
    if (Number.isInteger(distance)) return distance.toString();
    return distance.toFixed(2);
  };

  const activate = () => {
    setTheme('nodeBorderColor', colorBorders);
    setTheme('nodeAnchorColor', colorBorders);
    setTheme('nodeText', nodeDistanceText);
  };

  const deactivate = () => {
    removeAllThemes();
  };

  return {
    activate,
    deactivate,
  };
};
