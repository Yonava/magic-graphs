import { nullThrows } from '@magic/utils/assert';
import { generateId } from '@magic/utils/id';
import { getValue } from '@magic/utils/maybeGetter/index';

import { UPPERCASE_ALPHABET } from './constants.ts';
import { createLabelGenerator } from './createLabelGenerator.ts';
import { createLabelThemer } from './createLabelThemer.ts';
import { NodeLabelControls, NodeLabelPlugin } from './types.ts';

export const nodeLabel: NodeLabelPlugin = ({
  controls,
  events,
  actions,
  getters,
}) => {
  const nodeIdToLabel = new Map<string, string>();

  const getNodeLabel = (nodeId: string) => nodeIdToLabel.get(nodeId);
  const getNodeLabelWithAssert: NodeLabelControls['get'] = (nodeId) =>
    nullThrows(
      getNodeLabel(nodeId),
      'could not find label on node with id:' + nodeId,
    );

  const setNodeLabels: NodeLabelControls['setMany'] = (labels) => {
    return labels.map(({ nodeId, label: labelOrLabelGetter }) => {
      const currentLabel = getNodeLabel(nodeId);
      const label = getValue(labelOrLabelGetter, currentLabel);
      nodeIdToLabel.set(nodeId, label);
      return { nodeId, label };
    });
  };

  const generateLabel = createLabelGenerator({
    getLabels: () =>
      // TODO breaks when multiple nodes are added in bulk. Needs to change
      // https://github.com/Yonava/magic-graphs/issues/700
      controls.nodes.map((n) => getNodeLabelWithAssert(n.id)),
    sequence: UPPERCASE_ALPHABET,
  });

  const themer = createLabelThemer(controls, getNodeLabelWithAssert);

  const enable = themer.enable;
  const disable = themer.disable;

  enable();

  return {
    name: 'nodeLabel',
    events,
    getters: {
      ...getters,
      getNode: (id) => {
        const node = getters.getNode(id);
        const label = getNodeLabelWithAssert(node.id);
        return { ...node, label };
      },
    },
    actions: {
      ...actions,
      addNode: (options) => {
        const id = options?.id ?? generateId();
        // TODO addNode transaction might fail, and if it does it will
        // leave dangling labels in memory
        setNodeLabels([
          { label: options.label ?? generateLabel(), nodeId: id },
        ]);
        return actions.addNode({ ...options, id });
      },
      removeNode: (options) => {
        nodeIdToLabel.delete(options.id);
        return actions.removeNode(options);
      },
      // TODO add bulk additions and removals!
    },
    controls: {
      get: getNodeLabelWithAssert,
      set: (label) => setNodeLabels([label]),
      setMany: setNodeLabels,
      lifecycle: {
        enable,
        disable,
      },
      _internal: {
        nodeIdToLabel,
      },
    },
  };
};
