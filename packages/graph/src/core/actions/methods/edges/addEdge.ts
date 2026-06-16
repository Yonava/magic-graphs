import { nullThrows } from '@magic/utils/assert';
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

export const createAddEdgeHandler =
  ({
    graph,
    commitTransaction,
  }: GraphActionsOptions): GraphActions['addEdge'] =>
  (edge) => {
    const edgeWithDefaults = resolveEdgeDefaults(edge);

    const { addedEdges } = commitTransaction({ addEdges: [edgeWithDefaults] });

    const telemetryEdge = nullThrows(
      addedEdges[0],
      'Failed to append edge. Transaction rejected.',
    );

    return nullThrows(
      graph.edges.value.find((e) => e.id === telemetryEdge.id),
      '[Graph Actions] Edge creation succeeded but entity was not found in live state.',
    );
  };
