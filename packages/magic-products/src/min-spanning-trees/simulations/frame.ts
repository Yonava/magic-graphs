import { GEdge, GNode, Graph } from '@magic/shared/graph';
import { FrameCollectorFn } from '@magic/shared/simulation/types';

export type PrimsFunction = (
  graph: Graph,
  startNodeId: GNode['id'],
) => FrameCollectorFn<PrimsFrame>;

type StartFrame = {
  type: 'start';
  start: GNode['id'];
};

type EndFrame = {
  type: 'end';
};

type AddToTreeFrame = {
  type: 'add-to-tree';
  node: GNode['id'];
  edge: GEdge['id'];
};

/** every edge crossing the cut this round, weighed together rather than one at a time */
type ConsiderEdgesFrame = {
  type: 'consider-edges';
  edges: readonly GEdge['id'][];
};

type SelectEdgeFrame = {
  type: 'select-edge';
  /** the cheapest crossing edge, about to be added to the tree */
  edge: GEdge['id'];
  /** the node it brings in */
  node: GNode['id'];
  /** other crossing edges that tied it on weight, when the cheapest edge was not unique */
  tiedEdges?: readonly GEdge['id'][];
};

type UnreachableFrame = {
  type: 'unreachable';
  nodes: readonly GNode['id'][];
};

export type PrimsStep =
  | StartFrame
  | EndFrame
  | AddToTreeFrame
  | ConsiderEdgesFrame
  | SelectEdgeFrame
  | UnreachableFrame;

/**
 * the state every frame carries, rebuilt before every step. required rather
 * than optional so a reader does not have to ask whether the run it is
 * watching has a tree yet
 */
type PrimsState = {
  /** nodes already grown into the tree */
  treeNodeIds: readonly GNode['id'][];
  /** edges already grown into the tree */
  treeEdgeIds: readonly GEdge['id'][];
  /** the node the user picked to grow the tree from */
  anchorNodeId: GNode['id'];
};

/**
 * what is being looked at this frame rather than what is known. optional
 * because it varies step to step
 */
export type PrimsHighlights = {
  /**
   * the tree-side node the current decision is anchored to - the node whose
   * edge is being taken. this is NOT always the most recently grown node:
   * prim's compares the whole cut at once, so the cheapest edge can come from
   * anywhere the tree already reaches, not just wherever it grew last. undefined
   * while multiple tree nodes are being weighed at once with no single one in
   * play yet
   */
  activeNodeId?: GNode['id'];
  /** nodes on the far end of a crossing edge, not yet in the tree, still being weighed */
  pendingNodeIds?: readonly GNode['id'][];
  /**
   * every edge crossing the cut this round, not yet resolved either way.
   * stays lit for as long as an edge remains unresolved rather than toggling
   * off just because it was not this round's pick - an edge that is still a
   * live candidate should not look like it was ruled out and came back
   */
  frontierEdgeIds?: readonly GEdge['id'][];
  /** the one edge actually being taken into the tree this round */
  activeEdgeId?: GEdge['id'];
};

export type PrimsFrame = PrimsStep & PrimsState & PrimsHighlights;
