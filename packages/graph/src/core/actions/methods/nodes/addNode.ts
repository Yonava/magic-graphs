import { nullThrows } from '@magic/utils/assert';
import { generateId } from '@magic/utils/id';

import { GNode } from '../../../../types.ts';
import { CreateCoreAction } from '../../types.ts';

export const nodeDefaults = () =>
  ({
    id: generateId(),
  }) as const satisfies Partial<GNode>;

export const createAddNodeHandler: CreateCoreAction<'addNode'> =
  ({ graph, commitTransaction }) =>
  (node) => {
    const nodeWithDefaults = { ...nodeDefaults(), ...node };

    // https://github.com/Yonava/magic-graphs/issues/685
    // must be before commitTransaction because
    // onTransactionComplete is used to refresh the graphUnderCursor
    // state, and to do that the schemas need to be resolved which requires
    // a lookup to the node positioning system.
    // I don't like putting this call before knowing if the transaction
    // is successful because if the transaction fails, node
    // positioning system will hold a reference to a node id that
    // doesn't exist in the graph
    graph.positions._internal.add([nodeWithDefaults]);

    const { addedNodes } = commitTransaction({ addNodes: [nodeWithDefaults] });

    const telemetryNode = nullThrows(
      addedNodes[0],
      '[Graph Actions] Failed to append node. Transaction rejected.',
    );

    const liveNode = nullThrows(
      graph.nodes.value.find((n) => n.id === telemetryNode.id),
      '[Graph Actions] Node creation succeeded but entity was not found in live state.',
    );

    return liveNode;
  };
