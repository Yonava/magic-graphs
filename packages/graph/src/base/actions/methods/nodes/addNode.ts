import { generateId } from '@magic/utils/id';

import { useNodeLetterLabelGetter } from '../../../../labels.ts';
import { GNode } from '../../../../types.ts';
import { GraphActions } from '../../types.ts';
import { GraphActionsOptions } from '../../useGraphActions.ts';

const getNodeDefaults = () =>
  ({
    id: generateId(),
    x: 0,
    y: 0,
  }) as const satisfies Partial<GNode>;

export const createAddNodeHandler = ({
  graphState,
  commitTransaction,
}: GraphActionsOptions): GraphActions['addNode'] => {
  const getLabel = useNodeLetterLabelGetter(graphState);
  const addNode: GraphActions['addNode'] = (node) => {
    const defaults = {
      ...getNodeDefaults(),
      label: getLabel(),
    } as const satisfies Partial<GNode>;

    const nodeWithDefaults = {
      ...defaults,
      ...node,
    };

    const { addedNodes } = commitTransaction({ addNodes: [nodeWithDefaults] });
    const addedNode = addedNodes[0];

    if (!addedNode) {
      throw new Error(
        `[Graph Actions] Failed to append node. Transaction rejected.`,
      );
    }

    return addedNode;
  };

  return addNode;
};
