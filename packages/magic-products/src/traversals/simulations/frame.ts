import { GEdge, GNode } from '@magic/shared/graph';

type VisitedNodes = {
  visitedNodeIds?: readonly GNode['id'][];
};

type ExploredNode = {
  exploredNode?: GNode['id'];
};

type QueuedNodes = {
  queuedNodeIds?: readonly GNode['id'][];
};

type TraveledEdges = {
  traveledEdgeIds?: readonly GEdge['id'][];
};

type TraversalPayload = VisitedNodes &
  ExploredNode &
  QueuedNodes &
  TraveledEdges;

type StartTraversalFrame = {
  type: 'start';
  node: GNode['id'];
};

type EndTraversalFrame = {
  type: 'end';
};

type ExploreNodeFrame = {
  type: 'explore-node';
};

type TravelingEdgeFrame = {
  type: 'travel-edge';
};

type EnqueueNodeFrame = {
  type: 'enqueue-node';
  node: GNode['id'];
};

type MarkVisitedFrame = {
  type: 'mark-visited';
  node: GNode['id'];
};

type PreviouslyVisited = {
  type: 'previously-visited';
  node: GNode['id'];
};

type DequeuedNodeVisitedFrame = {
  type: 'dequeued-node-already-visited';
  node: GNode['id'];
};

export type TraversalFrame = (
  | StartTraversalFrame
  | EndTraversalFrame
  | ExploreNodeFrame
  | TravelingEdgeFrame
  | EnqueueNodeFrame
  | MarkVisitedFrame
  | PreviouslyVisited
  | DequeuedNodeVisitedFrame
) &
  TraversalPayload;
