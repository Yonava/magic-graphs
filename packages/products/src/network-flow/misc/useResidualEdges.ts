import type { Graph } from '@graph/types';

/**
 * prefix on the edge ids to indicate that they are residual edges
 */
export const RESIDUAL_ID = 'residual';

export const isResidual = (edgeId: string) => edgeId.startsWith(RESIDUAL_ID);
const createResidualId = (edgeId: string) => `${RESIDUAL_ID}-${edgeId}`;

export const useResidualEdges = (graph: Graph) => {
  const cleanupResidualEdges = () => {
    graph.edges.value = graph.edges.value.filter(
      (e) => !e.id.startsWith(RESIDUAL_ID),
    );
    graph.persistent.trackGraphState();
  };

  const createResidualEdges = () => {
    cleanupResidualEdges();
    const residualEdges = graph.edges.value.map((e) => ({
      ...e,
      to: e.from,
      from: e.to,
      label: '0',
      id: createResidualId(e.id),
    }));

    graph.edges.value.push(...residualEdges);
  };

  return {
    cleanupResidualEdges,
    createResidualEdges,
  };
};
