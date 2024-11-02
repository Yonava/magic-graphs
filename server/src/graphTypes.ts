
/**
 * IMPORTANT!
 *
 * Do not modify this file directly. Modify the types in client @graph/types.ts
 * than duplicate the changes here.
 */

/**
 * @describes a node in a useGraph graph instance
 */
export type GNode = {
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
 * @describes an edge in a useGraph graph instance
 */
export type GEdge = {
  id: string,
  /**
   * id of the node that the edge is coming from
   */
  to: string,
  /**
   * id of the node that the edge is going to
   */
  from: string,
  weight: number,
  type: 'directed' | 'undirected',
}