import type { CoreEventMap } from '@magic/graph/core/events';
import { CoreGraph } from '@magic/graph/core/types';
import { CanvasEventMap } from '@magic/graph/plugins/canvas/events';
import { CanvasPlugin } from '@magic/graph/plugins/canvas/types';
import { GNode } from '@magic/graph/types';
import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';

import { GraphAddon } from '../../shared/types.ts';
import { NodeLabelStoreControls } from './types.ts';

export const createNodeLabel = <
  TransactionWrapperOptions,
  EventMap extends CoreEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: CoreGraph<TransactionWrapperOptions, EventMap, Plugins>,
): GraphAddon<NodeLabelStoreControls> => {
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

  const addNodesToLabelMap = (nodes: Readonly<GNode[]>) => {
    for (const { id } of nodes) nodeIdToLabel.set(id, 'L');
  };

  const removeNodesFromLabelMap = (nodeIds: Readonly<string[]>) => {
    for (const id of nodeIds) nodeIdToLabel.delete(id);
  };

  const activate = () => {
    graph.events.subscribe('onNodesAdded', addNodesToLabelMap);
    graph.events.subscribe('onNodesRemoved', removeNodesFromLabelMap);
  };

  const deactivate = () => {
    graph.events.subscribe('onNodesAdded', addNodesToLabelMap);
    graph.events.subscribe('onNodesRemoved', removeNodesFromLabelMap);
  };

  activate();

  return {
    get: getNodeLabel,
    set: (label) => setNodeLabels([label]),
    setMany: setNodeLabels,
    _internal: {
      nodeIdToLabel,
    },
    addOnControls: {
      activate,
      deactivate,
    },
  };
};
