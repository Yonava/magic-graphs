
/**
 * trace for bfs/dfs search
 */
export type BasicSearchTrace = {
  currentNodeId?: string;
  /**
   * nodes that have already been explored
   */
  visited: Set<string>;
  queue?: string[];
};
