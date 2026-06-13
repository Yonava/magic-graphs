import { nullThrows } from '@magic/utils/assert';
import { generateId } from '@magic/utils/id';

import { useNodeLetterLabelGetter } from '../../../../labels.ts';
import { GNode } from '../../../../types.ts';
import { GraphActionsOptions } from '../../createGraphActions.ts';
import { GraphActions } from '../../types.ts';

const getNodeDefaults = () =>
  ({
    id: generateId(),
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
}: GraphActionsOptions): GraphActions['addNode'] => {
  const resolveNodeDefaults = useResolveNodeDefaults(graphState);

  const addNode: GraphActions['addNode'] = (node) => {
    const nodeWithDefaults = resolveNodeDefaults(node);
    const { addedNodes } = commitTransaction({ addNodes: [nodeWithDefaults] });

    const telemetryNode = nullThrows(
      addedNodes[0],
      '[Graph Actions] Failed to append node. Transaction rejected.',
    );

    const liveNode = nullThrows(
      graphState.nodes.value.find((n) => n.id === telemetryNode.id),
      '[Graph Actions] Node creation succeeded but entity was not found in live state.',
    );

    graphState.nps._internal.add([nodeWithDefaults]);

    return liveNode;
  };

  return addNode;
};
