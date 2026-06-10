import type { Fraction } from 'mathjs';

import type { GraphSettings } from '../../settings/index.ts';
import type { GEdge, GNode } from '../../types.ts';
import { CoreGraph } from '../types.ts';

export type EdgeHelpers = {
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter for an {@link GEdge.weight | edge weight}
   *
   * ✅ recommended over using {@link GEdge.weight | edge weight} directly, as {@link GEdge.weight | edge weight} won't dynamically adjust to {@link GraphSettings.isGraphDirected | settings.isGraphDirected}
   */
  getWeight: (edgeId: GEdge['id']) => Fraction;
  /**
   * resolves {@link GEdge.source | edge.from} and {@link GEdge.target | edge.to} fields into an their referenced {@link GNode | nodes}
   */
  getConnectedNodes: (edgeId: GEdge['id']) => {
    sourceNode: GNode;
    targetNode: GNode;
  };
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware predicate returning `true` if provided {@link GEdge | edge} directs into provided {@link GNode | node}
   */
  isPointingTowardNode: (edgeId: GEdge['id'], nodeId: GNode['id']) => boolean;
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware predicate returning `true` if provided {@link GEdge | edge} directs from provided {@link GNode | node} to any other {@link GNode | node}
   */
  isPointingAwayFromNode: (edgeId: GEdge['id'], nodeId: GNode['id']) => boolean;
};

export type NodeHelpers = {
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter for all parents of the provided {@link GNode | node}
   *
   * ℹ️ a {@link GNode | nodes} parents are all {@link GNode | nodes} that connect directly to it
   */
  getParents: (nodeId: GNode['id']) => GNode[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter for all children of the provided {@link GNode | node}
   *
   * ℹ️ a {@link GNode | nodes} children are all {@link GNode | nodes} that this {@link GNode | node} connects directly to
   */
  getChildren: (nodeId: GNode['id']) => GNode[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter for all ancestors of the provided {@link GNode | node}
   *
   * ℹ️ a {@link GNode | nodes} ancestors are all {@link GNode | nodes} that can have a path through the graph to reach this {@link GNode | node}
   */
  getAncestors: (nodeId: GNode['id']) => GNode[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter for all descendants of the provided {@link GNode | node}
   *
   * ℹ️ a {@link GNode | nodes} descendants are all {@link GNode | nodes} that the provided {@link GNode | node} can reach via a path through the graph
   */
  getDescendants: (nodeId: GNode['id']) => GNode[];
  /**
   * gets all {@link GEdge | edges} that are attached to the provided {@link GNode | node}, regardless of {@link GEdge | edge} direction
   *
   * ⚠️ not {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware
   */
  getConnectedEdges: (nodeId: GNode['id']) => GEdge[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter returning all {@link GEdge | edges} connecting into provided {@link GNode | node}
   */
  getInboundEdges: (nodeId: GNode['id']) => GEdge[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter returning all {@link GEdge | edges} provided {@link GNode | node} connects to
   */
  getOutboundEdges: (nodeId: GNode['id']) => GEdge[];
  /**
   * gets the edges connecting two nodes
   *
   * ⚠️ not {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware
   *
   * ‼️ this getter is only for {@link GNode | nodes} that are directly linked together (ie a distance of 1 from each other)
   */
  getEdgesBetweenConnectedNodes: (
    node1Id: GNode['id'],
    node2Id: GNode['id'],
  ) => GEdge[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter that returns the edge linking a source node to a target node
   *
   * ℹ️ if the graph is undirected, this will return the edge regardless of whether it originates from `sourceNodeId` or `targetNodeId`
   */
  getEdgeBetween: (
    sourceNodeId: GNode['id'],
    targetNodeId: GNode['id'],
  ) => GEdge | undefined;
};

type FieldsNeededFromCoreGraph = 'getNode' | 'getEdge' | 'edges' | 'settings';

export type CoreGraphForHelpers = Pick<CoreGraph, FieldsNeededFromCoreGraph>;

export type CurryWithCoreGraph<Helpers> = {
  [Key in keyof Helpers]: (graph: CoreGraphForHelpers) => Helpers[Key];
};

export type CoreGraphHelpers = {
  edges: EdgeHelpers;
  nodes: NodeHelpers;
};
