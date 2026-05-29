import { generateId } from '@magic/utils/id';

import { useNodeLetterLabelGetter } from '../../../../labels.ts';
import { GNode } from '../../../../types.ts';
import { ADD_NODE_OPTIONS_DEFAULTS } from '../../../types.ts';
import { GraphActions } from '../../types.ts';
import { GraphActionsOptions } from '../../useGraphActions.ts';

const getNodeDefaults = () =>
  ({
    id: generateId(),
    x: 0,
    y: 0,
  }) as const satisfies Partial<GNode>;

export const useResolveNodeDefaults = (
  graphState: GraphActionsOptions['graphState'],
) => {
  const getLabel = useNodeLetterLabelGetter(graphState);
  return (node: Parameters<GraphActions['addNode']>[0]): GNode => ({
    ...getNodeDefaults(),
    label: getLabel(),
    ...node,
  });
};

export const createAddNodeHandler = ({
  graphState,
  commitTransaction,
  emit,
}: GraphActionsOptions): GraphActions['addNode'] => {
  const resolveNodeDefaults = useResolveNodeDefaults(graphState);
  const addNode: GraphActions['addNode'] = (node, options) => {
    const nodeWithDefaults = resolveNodeDefaults(node);
    const { addedNodes } = commitTransaction({ addNodes: [nodeWithDefaults] });

    const telemetryNode = addedNodes[0];
    if (!telemetryNode) {
      throw new Error(
        `[Graph Actions] Failed to append node. Transaction rejected.`,
      );
    }

    const liveNode = graphState.nodes.value.find(
      (n) => n.id === telemetryNode.id,
    );
    if (!liveNode) {
      throw new Error(
        `[Graph Actions] Node creation succeeded but entity was not found in live state.`,
      );
    }

    emit('onNodeAdded', liveNode, { ...ADD_NODE_OPTIONS_DEFAULTS, ...options });
    return liveNode;
  };

  return addNode;
};
