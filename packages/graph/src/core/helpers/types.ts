import type { Fraction } from 'mathjs';

import type { GraphSettings } from '../../settings/index.ts';
import type { CodeEdge, CoreNode } from '../../types.ts';
import { CoreControls } from '../types.ts';

export type EdgeHelpers = {
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter for an {@link CodeEdge.weight | edge weight}
   *
   * ✅ recommended over using {@link CodeEdge.weight | edge weight} directly, as {@link CodeEdge.weight | edge weight} won't dynamically adjust to {@link GraphSettings.isGraphDirected | settings.isGraphDirected}
   */
  getWeight: (edgeId: CodeEdge['id']) => Fraction;
  /**
   * resolves {@link CodeEdge.source | edge.from} and {@link CodeEdge.target | edge.to} fields into an their referenced {@link CoreNode | nodes}
   */
  getConnectedNodes: (edgeId: CodeEdge['id']) => {
    sourceNode: CoreNode;
    targetNode: CoreNode;
  };
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware predicate returning `true` if provided {@link CodeEdge | edge} directs into provided {@link CoreNode | node}
   */
  isPointingTowardNode: (
    edgeId: CodeEdge['id'],
    nodeId: CoreNode['id'],
  ) => boolean;
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware predicate returning `true` if provided {@link CodeEdge | edge} directs from provided {@link CoreNode | node} to any other {@link CoreNode | node}
   */
  isPointingAwayFromNode: (
    edgeId: CodeEdge['id'],
    nodeId: CoreNode['id'],
  ) => boolean;
};

export type NodeHelpers = {
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter for all parents of the provided {@link CoreNode | node}
   *
   * ℹ️ a {@link CoreNode | nodes} parents are all {@link CoreNode | nodes} that connect directly to it
   */
  getParents: (nodeId: CoreNode['id']) => CoreNode[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter for all children of the provided {@link CoreNode | node}
   *
   * ℹ️ a {@link CoreNode | nodes} children are all {@link CoreNode | nodes} that this {@link CoreNode | node} connects directly to
   */
  getChildren: (nodeId: CoreNode['id']) => CoreNode[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter for all ancestors of the provided {@link CoreNode | node}
   *
   * ℹ️ a {@link CoreNode | nodes} ancestors are all {@link CoreNode | nodes} that can have a path through the graph to reach this {@link CoreNode | node}
   */
  getAncestors: (nodeId: CoreNode['id']) => CoreNode[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter for all descendants of the provided {@link CoreNode | node}
   *
   * ℹ️ a {@link CoreNode | nodes} descendants are all {@link CoreNode | nodes} that the provided {@link CoreNode | node} can reach via a path through the graph
   */
  getDescendants: (nodeId: CoreNode['id']) => CoreNode[];
  /**
   * gets all {@link CodeEdge | edges} that are attached to the provided {@link CoreNode | node}, regardless of {@link CodeEdge | edge} direction
   *
   * ⚠️ not {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware
   */
  getConnectedEdges: (nodeId: CoreNode['id']) => CodeEdge[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter returning all {@link CodeEdge | edges} connecting into provided {@link CoreNode | node}
   */
  getInboundEdges: (nodeId: CoreNode['id']) => CodeEdge[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter returning all {@link CodeEdge | edges} provided {@link CoreNode | node} connects to
   */
  getOutboundEdges: (nodeId: CoreNode['id']) => CodeEdge[];
  /**
   * gets the edges connecting two nodes
   *
   * ⚠️ not {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware
   *
   * ‼️ this getter is only for {@link CoreNode | nodes} that are directly linked together (ie a distance of 1 from each other)
   */
  getEdgesBetweenConnectedNodes: (
    node1Id: CoreNode['id'],
    node2Id: CoreNode['id'],
  ) => CodeEdge[];
  /**
   * a {@link GraphSettings.isGraphDirected | settings.isGraphDirected} aware getter that returns the edge linking a source node to a target node
   *
   * ℹ️ if the graph is undirected, this will return the edge regardless of whether it originates from `sourceNodeId` or `targetNodeId`
   */
  getEdgeBetween: (
    sourceNodeId: CoreNode['id'],
    targetNodeId: CoreNode['id'],
  ) => CodeEdge | undefined;
};

type FieldsNeededFromCoreGraph = 'getNode' | 'getEdge' | 'edges' | 'settings';

export type CoreGraphForHelpers = Pick<CoreControls, FieldsNeededFromCoreGraph>;

export type CurryWithCoreGraph<Helpers> = {
  [Key in keyof Helpers]: (graph: CoreGraphForHelpers) => Helpers[Key];
};

export type CoreGraphHelpers = {
  edges: EdgeHelpers;
  nodes: NodeHelpers;
};
