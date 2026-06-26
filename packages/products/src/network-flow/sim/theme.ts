import colors from '@magic/utils/colors';

import { computed } from 'vue';

import type { SimulationControls } from '../../shared/ui/general/sim/types.ts';
import { GEdge } from '../../shared/useGraph.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import type { FlowTrace } from '../algo/fordFulkerson.ts';
import { FLOW_USETHEME_ID } from '../constants.ts';
import { isResidual } from '../misc/useResidualEdges.ts';

type WeightMap = Map<GEdge['id'], GEdge['weight']>;

export const useSimulationTheme = (
  graph: Graph,
  sim: SimulationControls<FlowTrace>,
) => {
  const canvas = graph.canvas.theme.createLayer(FLOW_USETHEME_ID);

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

  const colorActiveEdges = (edge: Omit<GEdge, 'weight'>) => {
    const isActive = activeEdgeIdsAtStep.value.includes(edge.id);
    const focusColor = graph.focus.theme._resolveToken(
      'edge.focus.color',
      edge,
    );
    if (isActive) return focusColor;
    else if (isResidual(edge.id)) return colors.ORANGE_400;
  };

  const labelEdges = (edge: Pick<GEdge, 'id'>) => {
    const weight = weightMapAtStep.value.get(edge.id);
    if (weight === undefined) return graph.getEdge(edge.id).weight.toString();
    return weight.toString();
  };

  const activate = () => {
    canvas.set('edge.default.color', colorActiveEdges);
    canvas.set('edge.default.text.content', labelEdges);
  };

  const deactivate = () => {
    canvas.remove('edge.default.color');
    canvas.remove('edge.default.text.content');
  };

  return {
    activate,
    deactivate,
  };
};
