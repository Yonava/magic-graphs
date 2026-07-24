import { GNode, Graph } from '../../graph/types.ts';
import { useResolvedStyles } from '../shared/useResolvedStyles.ts';

export const useNodeStyles = (graph: Graph, nodeId: GNode['id']) =>
  useResolvedStyles(graph, () => graph.theme.resolveNodeStyles({ id: nodeId }));
