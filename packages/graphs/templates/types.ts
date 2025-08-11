import type { GEdge, GNode } from '@graph/types';

/**
 * a blueprint for building a graph. templates come both built-in and user provided
 */
export type GraphTemplate = {
  /**
   * the id for the template
   */
  id: string;
  /**
   * true if a user has created this template and therefore isn't built in (therefore allowing it to be deleted)
   */
  isUserAdded?: boolean;
  /**
   * a thumbnail of the graph for preview
   */
  thumbnail?: string;
  /**
   * title of template shown to users
   */
  title: string;
  /**
   * additional info about the template shown to users
   */
  description: string;
  /**
   * the nodes and edges composing the graph this template blueprints
   */
  graphState: {
    nodes: GNode[];
    edges: GEdge[];
  };
};
