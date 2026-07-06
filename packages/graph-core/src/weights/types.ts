import { CoreEdge } from '@magic/graph-primitives/types';
import { MaybeGetter } from '@magic/utils/maybeGetter/index';
import Fraction from 'fraction.js';

export type EdgeWeightEntry = {
  edgeId: CoreEdge['id'];
  weight: Fraction;
};

export type EdgeWeightUpdate = {
  edgeId: CoreEdge['id'];
  update: MaybeGetter<Fraction, [Fraction]>;
};

export type EdgeWeightStoreControls = {
  /** Returns the current weight of an edge. */
  get: (edgeId: string) => Fraction;
  /** Updates a single edge's weight and triggers {@link EdgeWeightStoreEventMap.onEdgeWeightsCommitted onEdgeWeightsCommitted}. */
  set: (update: EdgeWeightUpdate) => EdgeWeightEntry;
  /** Updates multiple edges' weights and triggers {@link EdgeWeightStoreEventMap.onEdgeWeightsCommitted onEdgeWeightsCommitted}. */
  setMany: (updates: EdgeWeightUpdate[]) => EdgeWeightEntry[];
  /** @internal */
  _internal: {
    add: (edges: (Pick<CoreEdge, 'id'> & { weight?: Fraction })[]) => void;
    remove: (edgeIds: CoreEdge['id'][]) => void;
    edgeIdToEdgeWeight: Map<string, Fraction>;
  };
};
