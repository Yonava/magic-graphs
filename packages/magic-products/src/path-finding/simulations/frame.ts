import { GEdge, GNode } from '@magic/shared/graph';

/**
 * a distance of undefined is infinity: no path has been found yet. it is not a
 * number so that arithmetic on it is a type error rather than a silent Infinity
 * creeping into a table cell
 */
export type Distance = number | undefined;

/**
 * weights are fractions, so a distance can land on a value no decimal writes
 * exactly. rounding is a display concern only: the numbers being compared are
 * always the unrounded ones
 */
export const formatDistance = (distance: Distance) => {
  if (distance === undefined) return '∞';
  return Number.isInteger(distance) ? `${distance}` : distance.toFixed(2);
};

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
  distance: number;
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
  newDistance: number;
};

type KeepDistanceFrame = {
  type: 'keep-distance';
  node: GNode['id'];
  distance: number;
  offered: number;
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
  viaPivot: number;
};

type ImprovePairFrame = {
  type: 'improve-pair';
  from: GNode['id'];
  to: GNode['id'];
  pivot: GNode['id'];
  oldDistance: Distance;
  newDistance: number;
};

type KeepPairFrame = {
  type: 'keep-pair';
  from: GNode['id'];
  to: GNode['id'];
  pivot: GNode['id'];
  distance: number;
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
