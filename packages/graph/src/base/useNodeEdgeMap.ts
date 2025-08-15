import type { GEdge, GNode } from '../types';

import { computed } from 'vue';
import type { Ref } from 'vue';

export const useNodeEdgeMap = (nodes: Ref<GNode[]>, edges: Ref<GEdge[]>) => {
  const nodeIdToNodeMap = computed(() => {
    const map = new Map<GNode['id'], GNode>();
    for (const node of nodes.value) {
      map.set(node.id, node);
    }
    return map;
  });

  const edgeIdToEdgeMap = computed(() => {
    const map = new Map<GEdge['id'], GEdge>();
    for (const edge of edges.value) {
      map.set(edge.id, edge);
    }
    return map;
  });

  return { nodeIdToNodeMap, edgeIdToEdgeMap };
};

export type UseNodeEdgeMap = typeof useNodeEdgeMap;
export type NodeMap = ReturnType<UseNodeEdgeMap>['nodeIdToNodeMap'];
export type EdgeMap = ReturnType<UseNodeEdgeMap>['edgeIdToEdgeMap'];
