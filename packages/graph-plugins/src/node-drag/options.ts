export type NodeDragOptions = {
  /**
   * whether a completed drag is recorded to history, when the history plugin is
   * installed and enabled. a drag records once on drop rather than once per frame
   * @default true
   */
  recordHistory: boolean;
};

export const DEFAULT_NODE_DRAG_OPTIONS: NodeDragOptions = {
  recordHistory: true,
};
