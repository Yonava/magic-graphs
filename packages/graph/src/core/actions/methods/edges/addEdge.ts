import { CreateCoreAction } from '@magic/graph-core-infra/actions/types';
import { nullThrows } from '@magic/utils/assert';
import { generateId } from '@magic/utils/id';

import { CoreEdge } from '../../../../../../graph-core-infra/src/types.ts';

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
      graph.edges.value.find((e) => e.id === telemetryEdge.id),
      '[Graph Actions] Edge creation succeeded but entity was not found in live state.',
    );
  };
