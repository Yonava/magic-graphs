import { Ref } from 'vue';

import { Emitter } from '../../events/index.ts';
import { GEdge, GNode } from '../../types.ts';
import { AggregatorProps } from '../useAggregator.ts';
import { TransactionOptions } from './types.ts';

type TransactionSucceededOptions = {
  nodes: Ref<GNode[]>;
  edges: Ref<GEdge[]>;
  updateGraphAtMousePosition: () => void;
  updateAggregator: AggregatorProps['updateAggregator'];
  emit: Emitter;
};

export const useTransactionSucceeded = ({
  nodes,
  edges,
  emit,
  updateAggregator,
  updateGraphAtMousePosition,
}: TransactionSucceededOptions): TransactionOptions['onTransactionSucceeded'] => {
  return (payload) => {
    if (payload.removedNodes.length || payload.removedEdges.length) {
      const removedNodeIds = new Set(payload.removedNodes.map((n) => n.id));
      const removedEdgeIds = new Set(payload.removedEdges.map((e) => e.id));

      nodes.value = nodes.value.filter((n) => !removedNodeIds.has(n.id));
      edges.value = edges.value.filter((e) => !removedEdgeIds.has(e.id));
    }

    nodes.value.push(...payload.addedNodes);
    edges.value.push(...payload.addedEdges);

    payload.updatedNodes.forEach((update) => {
      const target = nodes.value.find((n) => n.id === update.node.id);
      if (target) Object.assign(target, update.node);
    });

    payload.updatedEdges.forEach((update) => {
      const target = edges.value.find((e) => e.id === update.edge.id);
      if (target) Object.assign(target, update.edge);
    });

    updateGraphAtMousePosition();
    updateAggregator();
    emit('onTransactionComplete', payload);
  };
};
