import { GEdge, Graph } from '../../graph/types.ts';
import { useResolvedStyles } from '../shared/useResolvedStyles.ts';

// unlike resolveNodeStyles, resolveEdgeStyles needs the whole edge rather than
// just an id, since tokens can key off source and target
export const useEdgeStyles = (graph: Graph, edgeId: GEdge['id']) =>
  useResolvedStyles(graph, () =>
    graph.theme.resolveEdgeStyles(graph.getEdge(edgeId)),
  );
