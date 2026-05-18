import type { GraphSettings } from "@magic/graph/settings";

/**
 * settings for abstract syntax tree useGraph instance
 */
export const AST_GRAPH_SETTINGS: Partial<GraphSettings> = {
  displayEdgeLabels: false,
  persistentStorageKey: "abstract-syntax-trees",
};
