import { GNode, Graph } from '@magic/shared/graph';
import { FrameCollectorFn } from '@magic/shared/simulation/types';
import Fraction from 'fraction.js';

import { Distance, DistanceMatrix } from '../distance.ts';

export type AllPairsFunction = (
  graph: Graph,
) => FrameCollectorFn<AllPairsFrame>;

type StartFrame = {
  type: 'start';
};

type EndFrame = {
  type: 'end';
};

type ChoosePivotFrame = {
  type: 'choose-pivot';
  node: GNode['id'];
  pivotNumber: number;
  totalPivots: number;
};

type ConsiderPairFrame = {
  type: 'consider-pair';
  from: GNode['id'];
  to: GNode['id'];
  pivot: GNode['id'];
  direct: Distance;
  viaPivot: Fraction;
};

type ImprovePairFrame = {
  type: 'improve-pair';
  from: GNode['id'];
  to: GNode['id'];
  pivot: GNode['id'];
  oldDistance: Distance;
  newDistance: Fraction;
};

type KeepPairFrame = {
  type: 'keep-pair';
  from: GNode['id'];
  to: GNode['id'];
  pivot: GNode['id'];
  distance: Fraction;
};

type NegativeCycleFrame = {
  type: 'negative-cycle';
  node: GNode['id'];
};

export type AllPairsStep =
  | StartFrame
  | EndFrame
  | ChoosePivotFrame
  | ConsiderPairFrame
  | ImprovePairFrame
  | KeepPairFrame
  | NegativeCycleFrame;

/**
 * the table is rebuilt into every frame, so it is required. which cell is being
 * looked at is not here on purpose: the pair lives on the frames that have one,
 * where the reader can see it belongs to that step and nowhere else
 */
type AllPairsState = {
  /** the distance between every ordered pair of nodes */
  matrix: DistanceMatrix;
};

export type AllPairsHighlights = {
  /** the pivot the algorithm is detouring through this frame */
  activeNodeId?: GNode['id'];
  /** the two ends of the pair being weighed this frame */
  candidateNodeIds?: readonly GNode['id'][];
};

export type AllPairsFrame = AllPairsStep & AllPairsState & AllPairsHighlights;
