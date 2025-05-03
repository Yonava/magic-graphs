import type { ReasonText } from './types';

export const CANT_GO_WITH_GRAPH_REASONS = {
  NODE_LABEL_NOT_NUMBER: {
    title: 'Node labels must be a number',
    description: "All node labels must be numbers to allow 'go with graph'",
  },
} as const satisfies Record<string, ReasonText>;
