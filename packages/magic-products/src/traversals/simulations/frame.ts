import { GEdge, GNode } from '@magic/shared/graph';

type VisitedNodes = {
  visitedNodeIds?: readonly GNode['id'][];
};

type CurrentNode = {
  currentNodeId?: GNode['id'];
};

type QueuedNodes = {
  queuedNodeIds?: readonly GNode['id'][];
};

type TraversalPayload = VisitedNodes & CurrentNode & QueuedNodes;

type StartTraversalFrame = {
  type: 'start';
};

type EndTraversalFrame = {
  type: 'end';
};

type ExploreNodeFrame = {
  type: 'explore-node';
};

type TravelingEdgeFrame = {
  type: 'travel-edge';
  /**
   * the edge being crossed to reach {@link CurrentNode.currentNodeId}. required
   * rather than optional so that a travel-edge frame always names its edge, and
   * so that reading it forces a narrow on `type` first
   */
  traveledEdgeId: GEdge['id'];
};

type EnqueueNodeFrame = {
  type: 'enqueue-node';
};

type DequeueNodeFrame = {
  type: 'dequeue-node';
};

export type TraversalFrame = (
  | StartTraversalFrame
  | EndTraversalFrame
  | ExploreNodeFrame
  | TravelingEdgeFrame
  | EnqueueNodeFrame
  | DequeueNodeFrame
) &
  TraversalPayload;
