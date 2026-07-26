import { GEdge, GNode } from '@magic/shared/graph';
import Fraction from 'fraction.js';

/**
 * a distance is a sum of edge weights, so it is a fraction for the same reason
 * a weight is one: three hops of 1/3 have to land on exactly 1, and in floats
 * they land just under it, which is enough to pick the wrong shortest path.
 *
 * undefined is infinity, rather than a number, so that adding to a distance we
 * have not found yet is a type error instead of an Infinity in a table cell
 */
export type Distance = Fraction | undefined;

export const formatDistance = (distance: Distance) =>
  distance === undefined ? '∞' : distance.toFraction();

/** the best known distance from one fixed source to every node */
export type DistanceRow = Readonly<Record<GNode['id'], Distance>>;

/** the best known distance between every ordered pair, keyed source then target */
export type DistanceMatrix = Readonly<Record<GNode['id'], DistanceRow>>;

type ActiveNode = {
  /** the node the algorithm is standing on this frame */
  activeNodeId?: GNode['id'];
};

type CandidateNodes = {
  /** nodes whose distance is being weighed this frame, but not yet changed */
  candidateNodeIds?: readonly GNode['id'][];
};

type SettledNodes = {
  /** nodes whose distance can no longer improve */
  settledNodeIds?: readonly GNode['id'][];
};

type PendingNodes = {
  /** nodes with a tentative distance, waiting in the frontier */
  pendingNodeIds?: readonly GNode['id'][];
};

type AnchorNode = {
  /** the node the user picked to measure every distance from */
  anchorNodeId?: GNode['id'];
};

type RelaxingEdges = {
  /** edges whose weight is being tested this frame */
  relaxingEdgeIds?: readonly GEdge['id'][];
};

type TreeEdges = {
  /** the edges that make up the best paths known so far */
  treeEdgeIds?: readonly GEdge['id'][];
};

type RejectedEdges = {
  /** edges tested this frame that offered nothing better than what we had */
  rejectedEdgeIds?: readonly GEdge['id'][];
};

type Distances = {
  /** single source: the distance from the source to every node */
  distances?: DistanceRow;
};

type Matrix = {
  /** all pairs: the distance between every ordered pair of nodes */
  matrix?: DistanceMatrix;
};

type PathFindingPayload = ActiveNode &
  CandidateNodes &
  SettledNodes &
  PendingNodes &
  AnchorNode &
  RelaxingEdges &
  TreeEdges &
  RejectedEdges &
  Distances &
  Matrix;

type StartFrame = {
  type: 'start';
  /** absent for the all pairs algorithms, which measure from everywhere at once */
  source?: GNode['id'];
};

type EndFrame = {
  type: 'end';
};

type SettleNodeFrame = {
  type: 'settle-node';
  node: GNode['id'];
  distance: Fraction;
};

type RelaxEdgeFrame = {
  type: 'relax-edge';
  edge: GEdge['id'];
  from: GNode['id'];
  to: GNode['id'];
};

type ImproveDistanceFrame = {
  type: 'improve-distance';
  node: GNode['id'];
  oldDistance: Distance;
  newDistance: Fraction;
};

type KeepDistanceFrame = {
  type: 'keep-distance';
  node: GNode['id'];
  distance: Fraction;
  offered: Fraction;
};

type UnreachableFrame = {
  type: 'unreachable';
  nodes: readonly GNode['id'][];
};

type BeginPassFrame = {
  type: 'begin-pass';
  pass: number;
  totalPasses: number;
};

type PassSettledFrame = {
  type: 'pass-settled';
  pass: number;
};

type NegativeCycleFrame = {
  type: 'negative-cycle';
  node: GNode['id'];
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

export type PathFindingFrame = (
  | StartFrame
  | EndFrame
  | SettleNodeFrame
  | RelaxEdgeFrame
  | ImproveDistanceFrame
  | KeepDistanceFrame
  | UnreachableFrame
  | BeginPassFrame
  | PassSettledFrame
  | NegativeCycleFrame
  | ChoosePivotFrame
  | ConsiderPairFrame
  | ImprovePairFrame
  | KeepPairFrame
) &
  PathFindingPayload;
