import { useGraph } from "@graph/useGraph";
import type { Shape } from "@shape/types"
import type { MaybeGetter } from "@utils/maybeGetter";
import type { GraphTheme } from "./themes/types";
import type { GraphSettings } from "./settings";

/**
 * the useGraph composition function
 */
export type UseGraph = typeof useGraph

/**
 * a graph instance (the return value of useGraph)
 */
export type Graph = ReturnType<UseGraph>

/**
 * a node in a graph instance
 */
export type GNode = {
  /**
   * unique identifier for the node
   */
  id: string,
  /**
   * it reflects what the user sees in the UI.
   * recommended to be unique.
   */
  label: string,
  /**
   * the x position of the node on the canvas
   */
  x: number,
  /**
   * the y position of the node on the canvas
   */
  y: number,
}

/**
 * an edge in a graph instance
 */
export type GEdge = {
  /**
   * unique identifier for the edge
   */
  id: string,
  /**
   * id of the node that the edge is coming from
   */
  to: string,
  /**
   * id of the node that the edge is going to
   */
  from: string,
  /**
   * the text label that appears on the edge
   */
  label: string,
}

/**
 * the array in which schema items are added into in order to be rendered on the canvas
 */
export type Aggregator = SchemaItem[]

/**
 * a function that takes an `aggregator` and returns an `aggregator` with alterations to
 * the internal contents, these functions are layered on top of each other to create a pipeline
 * which will be invoked with a reducer each render cycle
 */
export type UpdateAggregator = (aggregator: Aggregator) => Aggregator

export type NodeGetterOrValue<T> = MaybeGetter<T, [GNode]>
export type EdgeGetterOrValue<T> = MaybeGetter<T, [GEdge]>

type BaseGraphTypes = 'node' | 'edge'
type MarqueeGraphTypes = 'marquee-box' | 'encapsulated-node-box'
type NodeAnchorGraphTypes = 'node-anchor' | 'link-preview'
type AnnotationGraphTypes = 'annotation'
type InteractiveGraphTypes = 'node-hover-effect'

/**
 * an item that can be fed into the `aggregator` in order to be rendered on the canvas
 */
export type SchemaItem = {
  /**
   * unique identifier for the schema item
   */
  id: string,
  /**
   * the type of graph data this schema item represents (node, edge, etc.)
   */
  graphType: BaseGraphTypes | NodeAnchorGraphTypes | MarqueeGraphTypes | AnnotationGraphTypes | InteractiveGraphTypes,
  /**
   * determines the order in which this schema item is rendered
   * on the canvas. The lower the number, the higher the priority, the higher the priority,
   * the earlier the item is rendered on the canvas.
   * (items with a lower priority score will appear visually underneath those with a higher score)
   */
  priority: number,
  /**
   * the {@link Shape | shape} instance that will be rendered on the canvas
   */
  shape: Shape,
}
