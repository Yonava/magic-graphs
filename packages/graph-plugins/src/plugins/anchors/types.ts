/**
 * an anchor instance that is attached to a node
 */
export type NodeAnchor = {
  /**
   * the x-coordinate of the anchor
   */
  x: number;
  /**
   * the y-coordinate of the anchor
   */
  y: number;
  /**
   * the direction of the anchor relative to the parent node.
   * ie the north anchor is the one that spawns above the node
   */
  direction: 'north' | 'east' | 'south' | 'west';
  /**
   * the unique id of the anchor
   */
  id: string;
};
