import { Ref } from 'vue';

import { AggregatorProps } from '../../plugins/canvas/useAggregator.ts';
import { GEdge, GNode } from '../../types.ts';
import { BaseGraph } from '../types.ts';
import { propagateTransactionEvents } from './propagateTransactionEvents.ts';
import { TransactionOptions } from './types.ts';

type TransactionSucceededOptions = {
  nodes: Ref<GNode[]>;
  edges: Ref<GEdge[]>;
  emit: BaseGraph['events']['emit'];
};

export const useTransactionSucceeded = ({
  nodes,
  edges,
  emit,
}: TransactionSucceededOptions): TransactionOptions['onTransactionSucceeded'] => {
  return (payload) => {
    if (payload.removedNodeIds.length || payload.removedEdgeIds.length) {
      const removedNodeIds = new Set(payload.removedNodeIds);
      const removedEdgeIds = new Set(payload.removedEdgeIds);

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

    propagateTransactionEvents(payload, emit);
  };
};
