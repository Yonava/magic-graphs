import { nullThrows } from '@core/utils/assert';
import { generateId } from '@core/utils/id';

import { CreateCoreAction } from '../../types.ts';

export const createAddEdgeHandler: CreateCoreAction<'addEdge'> =
  ({ graph, commitTransaction }) =>
  (edge) => {
    const newEdge = { id: generateId(), ...edge };

    graph.weights._internal.add([newEdge]);

    const { addedEdges } = commitTransaction({
      addEdges: [newEdge],
    });

    const telemetryEdge = nullThrows(
      addedEdges[0],
      'Failed to append edge. Transaction rejected.',
    );

    return nullThrows(
      graph.edges.find((e) => e.id === telemetryEdge.id),
      '[Graph Actions] Edge creation succeeded but entity was not found in live state.',
    );
  };
