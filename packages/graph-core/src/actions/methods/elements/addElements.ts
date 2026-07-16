import { generateId } from '@core/utils/id';

import { CreateCoreAction } from '../../types.ts';

export const createAddElementsHandler: CreateCoreAction<'addElements'> =
  ({ graph, commitTransaction }) =>
  ({ nodes = [], edges = [] }) => {
    const newNodes = nodes.map((n) => ({
      id: generateId(),
      ...n,
    }));
    const newEdges = edges.map((e) => ({
      id: generateId(),
      ...e,
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
    graph.positions._internal.add(newNodes);
    graph.weights._internal.add(newEdges);

    const { addedEdges, addedNodes } = commitTransaction({
      addNodes: newNodes,
      addEdges: newEdges,
    });

    return { addedEdges, addedNodes };
  };
