import { nullThrows } from '@core/utils/assert';
import { generateId } from '@core/utils/id';
import { CoreEdge } from '@graph/primitives/types';

import { CreateCoreAction } from '../../types.ts';

export const edgeDefaults = () =>
  ({
    id: generateId(),
  }) as const satisfies Partial<CoreEdge>;

export const createAddEdgeHandler: CreateCoreAction<'addEdge'> =
  ({ graph, commitTransaction }) =>
  (edge) => {
    const edgeWithDefaults = {
      ...edgeDefaults(),
      ...edge,
    };

    graph.weights._internal.add([edgeWithDefaults]);

    const { addedEdges } = commitTransaction({ addEdges: [edgeWithDefaults] });

    const telemetryEdge = nullThrows(
      addedEdges[0],
      'Failed to append edge. Transaction rejected.',
    );

    return nullThrows(
      graph.edges.find((e) => e.id === telemetryEdge.id),
      '[Graph Actions] Edge creation succeeded but entity was not found in live state.',
    );
  };
