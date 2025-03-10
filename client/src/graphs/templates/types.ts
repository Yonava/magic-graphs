import type { GEdge, GNode } from '@graph/types';

export type GraphTemplate = {
  id: string;
  isUserAdded?: boolean;
  thumbnail?: string;
  title: string;
  description: string;
  graphState: {
    nodes: GNode[];
    edges: GEdge[];
  };
};
