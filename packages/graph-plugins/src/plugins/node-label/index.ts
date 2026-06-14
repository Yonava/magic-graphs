import type { CoreEventMap } from '@magic/graph/core/events';
import { CoreGraph } from '@magic/graph/core/types';
import { CanvasEventMap } from '@magic/graph/plugins/canvas/events';
import { CanvasPlugin } from '@magic/graph/plugins/canvas/types';
import { GNode } from '@magic/graph/types';
import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';

import { UPPERCASE_ALPHABET } from './constants.ts';
import { createLabelGetter } from './createLabelGetter.ts';
import { createLabelThemer } from './createLabelThemer.ts';
import { GraphWithNodeLabel, NodeLabelStoreControls } from './types.ts';

export const createNodeLabel = <
  TransactionWrapperOptions,
  EventMap extends CoreEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: CoreGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphWithNodeLabel<TransactionWrapperOptions, EventMap, Plugins> => {
  const nodeIdToLabel = new Map<string, string>();

  const getNodeLabel: NodeLabelStoreControls['get'] = (nodeId) =>
    nullThrows(
      nodeIdToLabel.get(nodeId),
      `could not resolve label from node with id ${nodeId}`,
    );

  const setNodeLabels: NodeLabelStoreControls['setMany'] = (labels) => {
    return labels.map(({ nodeId, label: labelOrLabelGetter }) => {
      const currentLabel = getNodeLabel(nodeId);
      const label = getValue(labelOrLabelGetter, currentLabel);

      return { nodeId, label };
    });
  };

  const getNewLabel = createLabelGetter({
    getLabels: () =>
      graph.nodes.value.slice(0, -1).map((n) => getNodeLabel(n.id)),
    sequence: UPPERCASE_ALPHABET,
  });

  const addNodesToLabelMap = (nodes: Readonly<GNode[]>) => {
    for (const { id } of nodes) nodeIdToLabel.set(id, getNewLabel());
  };

  const removeNodesFromLabelMap = (nodeIds: Readonly<string[]>) => {
    for (const id of nodeIds) nodeIdToLabel.delete(id);
  };

  const themer = createLabelThemer(graph.canvas.theme, getNodeLabel);

  const activate = () => {
    graph.events.subscribe('onNodesAdded', addNodesToLabelMap);
    graph.events.subscribe('onNodesRemoved', removeNodesFromLabelMap);
    themer.activate();
  };

  const deactivate = () => {
    graph.events.unsubscribe('onNodesAdded', addNodesToLabelMap);
    graph.events.unsubscribe('onNodesRemoved', removeNodesFromLabelMap);
    themer.deactivate();
  };

  activate();

  return {
    ...graph,
    getNode: (nodeId) => {
      const node = graph.getNode(nodeId);
      const label = getNodeLabel(node.id);
      return { ...node, label };
    },
    labels: {
      get: getNodeLabel,
      set: (label) => setNodeLabels([label]),
      setMany: setNodeLabels,
      _internal: {
        nodeIdToLabel,
      },
      activate,
      deactivate,
    },
  };
};
