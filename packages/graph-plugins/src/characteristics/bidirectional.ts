import { Controls } from './index.ts';

/**
 * all edges that link two nodes in both directions
 * (i.e. edge A->B and B->A are a bidirectional pair of edges)
 */
export const getBidirectionalEdges = (controls: Pick<Controls, 'edges'>) => {
  const edges = controls.edges;
  return edges
    .filter((edge) => edge.source !== edge.target)
    .filter((edge) => {
      return edges.some((otherEdge) => {
        return (
          edge.source === otherEdge.target && edge.target === otherEdge.source
        );
      });
    });
};
