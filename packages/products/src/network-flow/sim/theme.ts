import type { CodeEdge } from '@magic/graph/types';
import colors from '@magic/utils/colors';

import { computed } from 'vue';

import type { SimulationControls } from '../../shared/ui/general/sim/types.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { FlowTrace } from '../algo/fordFulkerson.ts';
import { FLOW_USETHEME_ID } from '../constants.ts';
import { isResidual } from '../misc/useResidualEdges.ts';

type WeightMap = Map<CodeEdge['id'], CodeEdge['weight']>;

export const useSimulationTheme = (
  graph: Graph,
  sim: SimulationControls<FlowTrace>,
) => {
  const { set, remove } = graph.canvas.theme.createLayer(FLOW_USETHEME_ID);

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

  const colorActiveEdges = (edge: CodeEdge) => {
    const isActive = activeEdgeIdsAtStep.value.includes(edge.id);
    const focusColor = graph.canvas.theme.resolvedPreset.value.edge.focus.color;
    if (isActive) return focusColor;
    else if (isResidual(edge.id)) return colors.ORANGE_400;
  };

  const labelEdges = (edge: CodeEdge) => {
    const weight = weightMapAtStep.value.get(edge.id);
    if (weight === undefined) return edge.weight.toString();
    return weight.toString();
  };

  const activate = () => {
    set('edge.default.color', colorActiveEdges);
    set('edge.default.text', labelEdges);
  };

  const deactivate = () => {
    remove('edge.default.color');
    remove('edge.default.text');
  };

  return {
    activate,
    deactivate,
  };
};
