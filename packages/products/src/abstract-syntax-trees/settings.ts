import type { GraphSettings } from '@magic/graph/settings';

/**
 * settings for abstract syntax tree useGraph instance
 */
export const AST_GRAPH_SETTINGS: Partial<GraphSettings> = {
  isGraphWeighted: false,
  persistent: false,
  interactive: false,
};
