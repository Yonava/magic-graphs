import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';
import { resolveEdgeDefaults } from '../edges/addEdge.ts';
import { useResolveNodeDefaults } from '../nodes/addNode.ts';

export const createAddElementsHandler = ({
  graph,
  commitTransaction,
}: GraphActionsOptions): GraphActions['addElements'] => {
  const resolveNodeDefaults = useResolveNodeDefaults(graph);
  const addElements: GraphActions['addElements'] = ({
    nodes = [],
    edges = [],
  }) => {
    const edgesWithDefaults = edges.map(resolveEdgeDefaults);
    const nodesWithDefaults = nodes.map(resolveNodeDefaults);

    // must be before commitTransaction because
    // onTransactionComplete is used to refresh the graphUnderCursor
    // state, and to do that the schemas need to be resolved which requires
    // a lookup to the node positioning system.
    // I don't like putting this call before knowing if the transaction
    // is successful because if the transaction fails, node
    // positioning system will hold a reference to a node id that
    // doesn't exist in the graph
    graph.positions._internal.add(nodesWithDefaults);

    const { addedEdges, addedNodes } = commitTransaction({
      addNodes: nodesWithDefaults,
      addEdges: edgesWithDefaults,
    });

    return { addedEdges, addedNodes };
  };

  return addElements;
};
