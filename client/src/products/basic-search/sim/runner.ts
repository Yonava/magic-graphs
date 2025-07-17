import type { ComputedRef } from 'vue';
import type { Graph } from '@graph/types';
import type { SimulationRunner } from '@ui/product/sim/types';
import { useSimulationControls } from '@ui/product/sim/useSimulationControls';
import { useBFS } from '../algo/useBFS';
import { useDFS } from '../algo/useDFS';
import { useSimulationTheme } from './theme';
import state from '../state';
import type { BasicSearchTrace } from '../algo/types';

const { startNode } = state;

export type BasicSearchSimulationRunner = SimulationRunner<BasicSearchTrace>;

const animateEdge = (g: Graph) => g.defineTimeline({
  forShapes: ['arrow', 'line'],
  durationMs: 700,
  keyframes: [],
  customInterpolations: {
    fillGradient: {
      value: (p) => [
        {
          color: 'red',
          offset: 0,
        },
        {
          color: 'red',
          offset: p,
        },
        {
          color: 'black',
          offset: p,
        },
      ],
      easing: 'in-out',
    },
  },
})

const useSimulationRunner = (
  graph: Graph,
  trace: ComputedRef<BasicSearchTrace[]>,
): BasicSearchSimulationRunner => {
  const simControls = useSimulationControls(trace);

  const { activate: theme, deactivate: untheme } = useSimulationTheme(
    graph,
    simControls,
  );

  const start = async () => {
    await startNode.set(graph);
    if (startNode.isUndefined.value) return;

    simControls.start();
    theme();
  };

  const { play: playAnimation, stop: stopAnimation } = animateEdge(graph)

  simControls.onStepChange(() => {
    const { traceAtStep } = simControls
    for (const edge of graph.edges.value) {
      stopAnimation({ shapeId: edge.id })
      if (traceAtStep.value.currentNodeId === edge.from && !traceAtStep.value.visited.has(edge.to) && traceAtStep.value.queue?.includes(edge.to)) {
        playAnimation({ shapeId: edge.id, runCount: 1 })
      }
    }
  })

  const stop = () => {
    startNode.cancelSet();

    simControls.stop();
    untheme();
  };

  return {
    start,
    stop,
    simControls,
  };
};

export const useBFSSimulationRunner = (graph: Graph) => {
  const { trace } = useBFS(graph);
  return useSimulationRunner(graph, trace);
};

export const useDFSSimulationRunner = (graph: Graph) => {
  const { trace } = useDFS(graph);
  return useSimulationRunner(graph, trace);
};
