export type NodeAnchorGraphSettings = {
  /**
   * whether node anchors are enabled, if true, anchors will spawn around nodes while hovered
   * enabling edge creation
   * @default true
   */
  nodeAnchors: boolean;
};

export const DEFAULT_NODE_ANCHOR_SETTINGS: NodeAnchorGraphSettings = {
  nodeAnchors: true,
};
