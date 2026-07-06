import { Fraction } from 'mathjs';

import { computed } from 'vue';

import type {
  SimulationRunner,
  TraceFunction,
} from '../../shared/ui/general/sim/types.ts';
import { useSimulationControls } from '../../shared/ui/general/sim/useSimulationControls.ts';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import { useStateAfterNSteps } from '../markov/useStateAfterNSteps.ts';
import state from '../state.ts';
import { useSimulationTheme } from './theme.ts';

const { initialState } = state;

export type MarkovChainTrace = TraceFunction<Fraction[]>;
export type MarkovChainSimulationRunner = SimulationRunner<Fraction[]>;

export const useSimulationRunner = (
  graph: Graph,
): MarkovChainSimulationRunner => {
  const { transitionMatrix } = graph;
  const { nodeIdToIndex } = graph;

  const initialStateVector = computed(() => {
    if (initialState.isUndefined.value) return [];

    const stateVector: Fraction[] = [];
    for (let i = 0; i < transitionMatrix.value.length; i++) {
      stateVector.push(new Fraction(0));
    }

    const nodeId = initialState.get(graph)!.id;
    const index = nodeIdToIndex(nodeId)!;

    stateVector[index] = new Fraction(1);
    return stateVector;
  });

  const trace = useStateAfterNSteps(transitionMatrix, initialStateVector);

  const simControls = useSimulationControls(trace);
  const theme = useSimulationTheme(graph, simControls);

  const start = async () => {
    await initialState.set(graph);
    if (initialState.isUndefined.value) return;

    simControls.start();
    theme.theme();
  };

  const stop = () => {
    initialState.cancelSet();

    simControls.stop();
    theme.untheme();
  };

  return {
    start,
    stop,
    simControls,
  };
};
