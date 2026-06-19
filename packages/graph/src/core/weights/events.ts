import { DeepReadonly } from 'ts-essentials';

import { EventMapToEventRegistry } from '../../events/types.ts';
import { EdgeWeightEntry } from './types.ts';

export type EdgeWeightStoreEventMap = {
  /** Triggers when a set of edge weights is committed. */
  onEdgeWeightsCommitted: (weights: DeepReadonly<EdgeWeightEntry[]>) => void;
};

type EdgeWeightStoreEventRegistry =
  EventMapToEventRegistry<EdgeWeightStoreEventMap>;

export const createEdgeWeightStoreEventRegistry =
  (): EdgeWeightStoreEventRegistry => ({
    onEdgeWeightsCommitted: new Set(),
  });
