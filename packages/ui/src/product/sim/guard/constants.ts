import definitions from '@graph/plugins/characteristics/definitions';

import type { ReasonText, ReasonTextGetter } from './types';

const minNodeText = (minNodes: number) => {
  if (minNodes === 1) return 'Requires at least 1 node';
  return `Requires at least ${minNodes} nodes` as const;
};

const minEdgeText = (minEdges: number) => {
  if (minEdges === 1) return 'Requires at least 1 edge';
  return `Requires at least ${minEdges} edges`;
};

export const CANT_RUN_REASONS = {
  NOT_WEIGHTED: {
    title: 'Requires weighted edges',
    description:
      'Edge labels must be displayed for the graph to be considered weighted',
  },
  NOT_UNWEIGHTED: {
    title: 'Requires unweighted edges',
    description:
      'Edge labels must be hidden for the graph to be considered unweighted',
  },
  NOT_DIRECTED: {
    title: 'Requires directed graph',
    description: 'The graph must be directed for this simulation to run',
  },
  NOT_UNDIRECTED: {
    title: 'Requires undirected graph',
    description: 'The graph must be undirected for this simulation to run',
  },
  NOT_ENOUGH_NODES: (minNodes: number) => ({
    title: minNodeText(minNodes),
    description:
      'The graph does not have enough nodes for this simulation to run',
  }),
  NOT_ENOUGH_EDGES: (minEdges: number) => ({
    title: minEdgeText(minEdges),
    description:
      'The graph does not have enough edges for this simulation to run',
  }),
  NOT_CONNECTED: {
    title: 'Requires connected graph',
    description: definitions.connected,
  },
  NOT_ACYCLIC: {
    title: 'Requires acyclic graph',
    description: definitions.acyclic,
  },
  NOT_BIPARTITE: {
    title: 'Requires bipartite graph',
    description: definitions.bipartite,
  },
  NEGATIVE_EDGE_WEIGHTS: {
    title: 'Requires non-negative edge weights',
    description: 'Edges that have negative weights/labels are not allowed',
  },
  NON_POSITIVE_EDGE_WEIGHTS: {
    title: 'Requires positive edge weights',
    description:
      'Edges that have zero or negative weights/labels are not allowed',
  },
  NO_SELF_REFERENCING_EDGES: {
    title: 'Requires no self-loops',
    description:
      'There is at least one edge that starts and ends at the same node',
  },
  NO_BIDIRECTIONAL_EDGES: {
    title: 'Requires no bidirectional edges',
    description:
      'There is at least one pair of nodes that are connected by two edges in opposite directions',
  },
} as const satisfies Record<string, ReasonText | ReasonTextGetter>;
