import type { CoreEdge } from '@magic/graph/types';
import colors from '@magic/utils/colors';

import type { SimulationControls } from '../../shared/ui/general/sim/types.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { BasicSearchTrace } from '../algo/types.ts';

export const SIM_COLORS = {
  CURRENT: colors.AMBER_600,
  QUEUED: colors.CYAN_500,
  VISITED: colors.BLUE_600,
} as const;

export const USETHEME_ID = 'basic-search';

export const useSimulationTheme = (
  graph: Graph,
  sim: SimulationControls<BasicSearchTrace>,
) => {
  const { traceAtStep } = sim;
  const { set, removeAll } = graph.canvas.theme.createLayer(USETHEME_ID);

  const colorBorders = ({ id }: { id: string }) => {
    if (graph.focus.isFocused(id)) return;

    if (traceAtStep.value?.currentNodeId === id) return SIM_COLORS.CURRENT;
    if (traceAtStep.value.visited.has(id)) return SIM_COLORS.VISITED;
    if (traceAtStep.value.queue?.includes(id)) return SIM_COLORS.QUEUED;
  };

  const colorEdge = (edge: CoreEdge) => {
    if (
      traceAtStep.value.currentNodeId === edge.source &&
      !traceAtStep.value.visited.has(edge.target) &&
      traceAtStep.value.queue?.includes(edge.target)
    ) {
      return 'red';
    }
  };

  const activate = () => {
    set('node.default.borderColor', colorBorders);
    set('nodeAnchor.default.color', colorBorders);
    set('edge.default.color', colorEdge);
  };

  const deactivate = () => {
    removeAll();
  };

  return {
    activate,
    deactivate,
  };
};
