import { nullThrows } from '@core/utils/assert';
import { generateId } from '@core/utils/id';
import { getValue } from '@core/utils/maybeGetter/index';

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
      controls.nodes
        .map((n) => getNodeLabel(n.id))
        .filter((label): label is string => label !== undefined),
    sequence: UPPERCASE_ALPHABET,
  });

  const themer = createLabelThemer(controls, getNodeLabelWithAssert);

  const enable = themer.enable;
  const disable = themer.disable;

  enable();

  return {
    name: 'nodeLabel',
    events,
    encode: () =>
      Array.from(nodeIdToLabel).map(([nodeId, label]) => ({
        nodeId,
        label,
      })),
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
        // remove node then delete since removing triggers a transaction which triggered a repaint.
        // And on that one tick where the repaint happens and the label has already been deleted, the program throws errors
        const removalPayload = actions.removeNode(options);
        nodeIdToLabel.delete(options.id);
        return removalPayload;
      },
      addElements: (options, shared) => {
        const addedElements = actions.addElements(options, shared);
        setNodeLabels(
          addedElements.addedNodes.map((node, i) => ({
            nodeId: node.id,
            label: options.nodes?.[i]?.label ?? generateLabel(),
          })),
        );
        return addedElements;
      },
      removeElements: (options, shared) => {
        const removedElements = actions.removeElements(options, shared);
        for (const nodeId of removedElements.removedNodeIds) {
          nodeIdToLabel.delete(nodeId);
        }
        return removedElements;
      },
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
