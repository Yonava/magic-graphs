import colors from '@magic/utils/colors';

import type { SimulationControls } from '../../shared/ui/general/sim/types.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { DijkstrasTraceStep } from '../algo/useDijkstra.ts';

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
  const { set, removeAll } = graph.canvas.theme.createLayer('dijkstra');

  const colorBorders = ({ id }: { id: string }) => {
    if (graph.focus.isFocused(id)) return;
    if (traceAtStep.value.currentNode?.id === id) return SIM_COLORS.SOURCE;
    if (traceAtStep.value.queue.has(id)) return SIM_COLORS.QUEUED;
    if (traceAtStep.value.distances[id] !== Infinity)
      return SIM_COLORS.EXPLORED;
  };

  const nodeDistanceText = ({ id }: { id: string }) => {
    if (graph.focus.isFocused(id)) return;
    const distance = traceAtStep.value.distances[id];
    if (distance === Infinity || distance === undefined) return INF_STR;
    if (Number.isInteger(distance)) return distance.toString();
    return distance.toFixed(2);
  };

  const activate = () => {
    set('node.default.border.color', colorBorders);
    set('anchors.default.color', colorBorders);
    set('node.default.text.content', nodeDistanceText);
  };

  const deactivate = () => {
    removeAll();
  };

  return {
    activate,
    deactivate,
  };
};
