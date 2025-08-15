import { useGraph } from './useGraph';
import type { Shape } from '@magic/shapes/types';
import type { MaybeGetter } from '@magic/utils/maybeGetter';
import type { Fraction } from 'mathjs';

/**
 * the useGraph composition function
 */
export type UseGraph = typeof useGraph;

/**
 * a graph instance (the return value of useGraph)
 */
export type Graph = ReturnType<UseGraph>;

/**
 * a weight for an edge connecting two nodes
 */
export type Weight = number | Fraction;

/**
 * a node in a graph instance
 */
export type GNode = {
  /**
   * unique identifier for the node
   */
  id: string;
  /**
   * the text that appears on the node
   */
  label: string;
  /**
   * the x position of the node on the canvas
   */
  x: number;
  /**
   * the y position of the node on the canvas
   */
  y: number;
};

/**
 * an edge in a graph instance
 */
export type GEdge = {
  /**
   * unique identifier for the edge
   */
  id: string;
  /**
   * {@link GNode.id | id} of the node that the edge is coming from
   */
  to: string;
  /**
   * {@link GNode.id | id} of the node that the edge is going to
   */
  from: string;
  /**
   * the text that appears on the edge, typically denotes edge weight
   */
  label: string;
};

/**
 * the array in which schema items are added into in order to be rendered on the canvas
 */
export type Aggregator = SchemaItem[];

/**
 * a function that takes an `aggregator` and returns an `aggregator` with alterations to
 * the internal contents, these functions are layered on top of each other to create a pipeline
 * which will be invoked with a reducer each render cycle
 */
export type UpdateAggregator = (aggregator: Aggregator) => Aggregator;

export type NodeGetterOrValue<T> = MaybeGetter<T, [GNode]>;
export type EdgeGetterOrValue<T> = MaybeGetter<T, [GEdge]>;

type BaseGraphTypes = 'node' | 'edge';
type MarqueeGraphTypes = 'marquee-box' | 'encapsulated-node-box';
type NodeAnchorGraphTypes = 'node-anchor' | 'link-preview';
type AnnotationGraphTypes = 'annotation' | 'annotation-eraser';

/**
 * an item that can be fed into the `aggregator` in order to be rendered on the canvas
 */
export type SchemaItem = {
  /**
   * unique identifier for the schema item
   */
  id: string;
  /**
   * the type of graph data this schema item represents (node, edge, etc.)
   */
  graphType:
  | BaseGraphTypes
  | NodeAnchorGraphTypes
  | MarqueeGraphTypes
  | AnnotationGraphTypes;
  /**
   * determines the rendering order of this schema item on the canvas.
   * Items with lower priority values are rendered earlier and appear
   * visually beneath items with higher values.
   */
  priority: number;
  /**
   * the {@link Shape | shape} instance that will be rendered on the canvas
   */
  shape: Shape;
};
