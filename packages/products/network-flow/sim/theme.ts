import { useTheme } from '@graph/themes/useTheme';
import type { GEdge, Graph } from '@graph/types';
import type { SimulationControls } from '@ui/product/sim/types';
import colors from '@utils/colors';

import { computed } from 'vue';

import type { FlowTrace } from '../algo/fordFulkerson';
import { FLOW_USETHEME_ID } from '../constants';
import { isResidual } from '../misc/useResidualEdges';

type WeightMap = Map<GEdge['id'], number>;

export const useSimulationTheme = (
  graph: Graph,
  sim: SimulationControls<FlowTrace>,
) => {
  const { setTheme, removeTheme } = useTheme(graph, FLOW_USETHEME_ID);

  const getActiveEdgeIdsAtStep = (step: number) => {
    const trace = sim.trace.value;
    if (!Array.isArray(trace)) throw 'trace is not an array';

    if (step === sim.trace.value.length) return [];
    const edgeIdsAtStep = Object.keys(trace[step]);
    return edgeIdsAtStep;
  };

  const activeEdgeIdsAtStep = computed(() =>
    getActiveEdgeIdsAtStep(sim.step.value),
  );

  const edgeWeightMapAtStep = computed(() => {
    const currentMap: WeightMap = new Map();

    const trace = sim.trace.value;
    if (!Array.isArray(trace)) throw 'trace is not an array';

    const weightMap = trace.reduce<WeightMap[]>((maps, traceAtStep) => {
      for (const edgeId in traceAtStep) {
        const edge = graph.getEdge(edgeId);
        if (!edge) throw 'edge not found';
        const weight = traceAtStep[edgeId];
        currentMap.set(edge.id, weight);
      }

      maps.push(new Map(currentMap));
      return maps;
    }, []);

    weightMap.push(new Map(currentMap));
    return weightMap;
  });

  const weightMapAtStep = computed(
    () => edgeWeightMapAtStep.value[sim.step.value],
  );

  const colorActiveEdges = (edge: GEdge) => {
    const isActive = activeEdgeIdsAtStep.value.includes(edge.id);
    const focusColor = graph.baseTheme.value.edgeFocusColor;
    if (isActive) return focusColor;
    else if (isResidual(edge.id)) return colors.ORANGE_400;
  };

  const labelEdges = (edge: GEdge) => {
    const weight = weightMapAtStep.value.get(edge.id);
    if (weight === undefined) return edge.label;
    return weight.toString();
  };

  const activate = () => {
    setTheme('edgeColor', colorActiveEdges);
    setTheme('edgeText', labelEdges);
  };

  const deactivate = () => {
    removeTheme('edgeColor');
    removeTheme('edgeText');
  };

  return {
    activate,
    deactivate,
  };
};
