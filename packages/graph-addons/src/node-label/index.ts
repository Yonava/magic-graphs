import type { CoreEventMap } from '@magic/graph/core/events';
import { CoreGraph } from '@magic/graph/core/types';
import { CanvasEventMap } from '@magic/graph/plugins/canvas/events';
import { CanvasPlugin } from '@magic/graph/plugins/canvas/types';
import { nullThrows } from '@magic/utils/assert';

import { NodeLabelStoreControls } from './types.ts';

export const createNodeLabel = <
  TransactionWrapperOptions,
  EventMap extends CoreEventMap & CanvasEventMap,
  Plugins extends CanvasPlugin,
>(
  graph: CoreGraph<TransactionWrapperOptions, EventMap, Plugins>,
) => {
  graph.events.subscribe('onNodesAdded', (nodes) => {});
  graph.events.subscribe('onNodesRemoved', (nodeIds) => {});

  const nodeIdToLabel = new Map<string, string>();

  const getNodeLabel: NodeLabelStoreControls['get'] = (nodeId) =>
    nullThrows(
      nodeIdToLabel.get(nodeId),
      `could not resolve label from node with id ${nodeId}`,
    );

  const setNodePositions: NodeLabelStoreControls['setMany'] = (labels) => {
    return positions.map(({ nodeId, update }) => {
      const currentPosition = getNodePosition(nodeId);
      const position = getValue(update, currentPosition);
      currentPosition.x = position.x ?? currentPosition.x;
      currentPosition.y = position.y ?? currentPosition.y;
      currentPosition.z = position.z ?? currentPosition.z;
      return { nodeId, position: { ...currentPosition } };
    });
  };
};
