import type { Shape } from '@magic/shapes/types/index';
import { Fraction } from 'mathjs';

import { useGraph } from './useGraph.ts';

export type { RemovableRef } from '@vueuse/core';
export type {
  DeepRequired,
  Prettify,
  UnionToIntersection,
} from 'ts-essentials';

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
   * {@link GNode.id | id} of the node that the edge is pointing towards
   */
  target: string;
  /**
   * {@link GNode.id | id} of the node that the edge is coming from
   */
  source: string;
  /**
   * the weight of the edge
   * @default new Fraction(1)
   */
  weight: Fraction;
};

/**
 * the array in which schema items are added into in order to be rendered on the canvas
 */
export type Aggregator = CanvasElement[];

/**
 * a function that takes an `aggregator` and returns an `aggregator` with alterations to
 * the internal contents, these functions are layered on top of each other to create a pipeline
 * which will be invoked with a reducer each render cycle
 */
export type AggregatorTransformer = (aggregator: Aggregator) => Aggregator;
type CoreGraphTypes = 'node' | 'edge';
type MarqueeGraphTypes = 'marquee-box' | 'encapsulated-node-box';
type NodeAnchorGraphTypes = 'node-anchor' | 'link-preview';
type AnnotationGraphTypes = 'annotation' | 'annotation-eraser';

/**
 * an element that can be fed into the `aggregator` in order to be rendered on the canvas
 */
export type CanvasElement = {
  /**
   * unique identifier for this element
   */
  id: string;
  /**
   * 🚨
   * TODO explore deprecating: https://github.com/Yonava/magic-graphs/issues/652
   * 🚨
   *
   * the type of graph data this element represents (node, edge, etc.)
   */
  graphType:
    | CoreGraphTypes
    | NodeAnchorGraphTypes
    | MarqueeGraphTypes
    | AnnotationGraphTypes;
  /**
   * determines the rendering order on the canvas.
   *
   * ℹ️ elements with lower priority values are rendered earlier and appear
   * visually beneath items with higher values.
   */
  priority: number;
  /**
   * the {@link Shape | shape} to be rendered on the canvas
   */
  shape: Shape;
  /**
   * attached metadata
   */
  data?: Record<string, unknown>;
};

export type GraphPlugin<PluginInterface extends Record<string, unknown>> =
  PluginInterface & {
    /**
     * enable plugin
     */
    activate: () => void;
    /**
     * disable plugin
     */
    deactivate: () => void;
  };
