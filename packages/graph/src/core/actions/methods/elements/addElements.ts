import { CreateCoreAction } from '@magic/graph-core-infra/actions/types';

import { edgeDefaults } from '../edges/addEdge.ts';
import { nodeDefaults } from '../nodes/addNode.ts';

export const createAddElementsHandler: CreateCoreAction<'addElements'> =
  ({ graph, commitTransaction }) =>
  ({ nodes = [], edges = [] }) => {
    const edgesWithDefaults = edges.map((edge) => ({
      ...edgeDefaults(),
      ...edge,
    }));
    const nodesWithDefaults = nodes.map((node) => ({
      ...nodeDefaults(),
      ...node,
    }));

    // https://github.com/Yonava/magic-graphs/issues/685
    // must be before commitTransaction because
    // onTransactionComplete is used to refresh the graphUnderCursor
    // state, and to do that the schemas need to be resolved which requires
    // a lookup to the node positioning system.
    // I don't like putting this call before knowing if the transaction
    // is successful because if the transaction fails, node
    // positioning system will hold a reference to a node id that
    // doesn't exist in the graph
    graph.positions._internal.add(nodesWithDefaults);
    graph.weights._internal.add(edgesWithDefaults);

    const { addedEdges, addedNodes } = commitTransaction({
      addNodes: nodesWithDefaults,
      addEdges: edgesWithDefaults,
    });

    return { addedEdges, addedNodes };
  };
