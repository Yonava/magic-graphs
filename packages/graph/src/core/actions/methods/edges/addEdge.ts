import { nullThrows } from '@magic/utils/assert';
import { generateId } from '@magic/utils/id';
import Fraction from 'fraction.js';

import { CodeEdge } from '../../../../types.ts';
import { CreateCoreAction } from '../../types.ts';

export const edgeDefaults = () =>
  ({
    id: generateId(),
    weight: new Fraction(1),
  }) as const satisfies Partial<CodeEdge>;

export const createAddEdgeHandler: CreateCoreAction<'addEdge'> =
  ({ graph, commitTransaction }) =>
  (edge) => {
    const edgeWithDefaults = {
      ...edgeDefaults(),
      ...edge,
    };

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
