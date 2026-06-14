import type { CoreEventMap } from '@magic/graph/core/events';
import { CoreGraph } from '@magic/graph/core/types';
import { CanvasEventMap } from '@magic/graph/plugins/canvas/events';
import { CanvasPlugin } from '@magic/graph/plugins/canvas/types';
import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';

import { NodeLabelStoreControls } from './types.ts';

export const createNodeLabel = <
  TransactionWrapperOptions,
  EventMap extends CoreEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: CoreGraph<TransactionWrapperOptions, EventMap, Plugins>,
): NodeLabelStoreControls => {
  graph.events.subscribe('onNodesAdded', (nodes) => {});
  graph.events.subscribe('onNodesRemoved', (nodeIds) => {});

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

  return {
    get: getNodeLabel,
    set: (label) => setNodeLabels([label]),
    setMany: setNodeLabels,
    _internal: {
      add: () => {},
      remove: () => {},
      nodeIdToLabel,
    },
  };
};
