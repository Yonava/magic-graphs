import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';
import { resolveEdgeDefaults } from '../edges/addEdge.ts';
import { useResolveNodeDefaults } from '../nodes/addNode.ts';

export const createAddElementsHandler = ({
  graphState,
  commitTransaction,
}: GraphActionsOptions): GraphActions['addElements'] => {
  const resolveNodeDefaults = useResolveNodeDefaults(graphState);
  const addElements: GraphActions['addElements'] = ({
    nodes = [],
    edges = [],
  }) => {
    const edgesWithDefaults = edges.map(resolveEdgeDefaults);
    const nodesWithDefaults = nodes.map(resolveNodeDefaults);

    const { addedEdges, addedNodes } = commitTransaction({
      addNodes: nodesWithDefaults,
      addEdges: edgesWithDefaults,
    });

    graphState.nps._internal.add(nodesWithDefaults);

    return { addedEdges, addedNodes };
  };

  return addElements;
};
