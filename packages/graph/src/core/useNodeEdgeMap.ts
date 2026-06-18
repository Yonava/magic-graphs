import { computed } from 'vue';
import type { Ref } from 'vue';

import type { CodeEdge, CoreNode } from '../types.ts';

export const useNodeEdgeMap = (
  nodes: Ref<CoreNode[]>,
  edges: Ref<CodeEdge[]>,
) => {
  const nodeIdToNodeMap = computed(() => {
    const map = new Map<CoreNode['id'], CoreNode>();
    for (const node of nodes.value) {
      map.set(node.id, node);
    }
    return map;
  });

  const edgeIdToEdgeMap = computed(() => {
    const map = new Map<CodeEdge['id'], CodeEdge>();
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
