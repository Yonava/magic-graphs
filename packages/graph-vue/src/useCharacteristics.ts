import { CharacteristicsControls } from '@graph/plugins/characteristics/index';

import { useSignals } from './utils/useSignal.ts';

export const useCharacteristics = (characteristics: CharacteristicsControls) =>
  useSignals({
    isComplete: characteristics.isComplete,
    cycles: characteristics.getCycles,
    sccs: characteristics.sccs,
    bidirectionalEdges: characteristics.bidirectionalEdges,
    bipartite: characteristics.bipartite,
    connected: characteristics.connected,
  });
