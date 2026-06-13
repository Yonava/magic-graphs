import { generateId } from '@magic/utils/id';
import Fraction from 'fraction.js';

import { GEdge } from '../../../../types.ts';
import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

const getEdgeDefaults = () =>
  ({
    id: generateId(),
    weight: new Fraction(1),
  }) as const satisfies Partial<GEdge>;

export const resolveEdgeDefaults = (
  edge: Parameters<GraphActions['addEdge']>[0],
): GEdge => ({
  ...getEdgeDefaults(),
  ...edge,
});

export const createAddEdgeHandler = ({
  graphState,
  commitTransaction,
}: GraphActionsOptions): GraphActions['addEdge'] => {
  const addEdge: GraphActions['addEdge'] = (edge) => {
    const edgeWithDefaults = resolveEdgeDefaults(edge);

    const { addedEdges } = commitTransaction({ addEdges: [edgeWithDefaults] });
    const telemetryEdge = addedEdges[0];

    if (!telemetryEdge) {
      throw new Error(
        `[Graph Actions] Failed to append edge. Transaction rejected.`,
      );
    }

    const liveEdge = graphState.edges.value.find(
      (e) => e.id === telemetryEdge.id,
    );

    if (!liveEdge) {
      throw new Error(
        `[Graph Actions] Edge creation succeeded but entity was not found in live state.`,
      );
    }

    return liveEdge;
  };

  return addEdge;
};
