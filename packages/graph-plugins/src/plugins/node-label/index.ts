import { GNode } from '@magic/graph/types';
import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';

import { UPPERCASE_ALPHABET } from './constants.ts';
import { createLabelGenerator } from './createLabelGenerator.ts';
import { createLabelThemer } from './createLabelThemer.ts';
import { NodeLabelControls, NodeLabelPlugin } from './types.ts';

export const nodeLabel: NodeLabelPlugin = (graph, events, actions) => {
  const nodeIdToLabel = new Map<string, string>();

  const getNodeLabel: NodeLabelControls['get'] = (nodeId) =>
    nullThrows(
      nodeIdToLabel.get(nodeId),
      `could not resolve label from node with id ${nodeId}`,
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
      // TODO this breaks when multiple nodes are added in bulk and implicitly requires newly added not to be the last node in the nodes array. This needs to change
      // https://github.com/Yonava/magic-graphs/issues/700
      graph.nodes.value.slice(0, -1).map((n) => getNodeLabel(n.id)),
    sequence: UPPERCASE_ALPHABET,
  });

  const themer = createLabelThemer(graph.canvas.theme, getNodeLabel);

  const enable = () => {
    themer.activate();
  };

  const disable = () => {
    themer.deactivate();
  };

  enable();

  return {
    events,
    actions: {
      ...actions,
      addNode: (options) => {
        const node = actions.addNode(options);
        setNodeLabels([
          { label: options.label ?? generateLabel(), nodeId: node.id },
        ]);
        return node;
      },
      removeNode: (options) => {
        nodeIdToLabel.delete(options.id);
        return actions.removeNode(options);
      },
      // TODO add bulk additions and removals!
    },
    controls: {
      nodeLabel: {
        get: getNodeLabel,
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
    },
  };
};
