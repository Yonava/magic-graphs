import { computed } from 'vue';
import type { Ref } from 'vue';

import type {
  CoreEdge,
  CoreNode,
} from '../../../graph-core-infra/src/types.ts';

export const useNodeEdgeMap = (
  nodes: Ref<CoreNode[]>,
  edges: Ref<CoreEdge[]>,
) => {
  const nodeIdToNodeMap = computed(() => {
    const map = new Map<CoreNode['id'], CoreNode>();
    for (const node of nodes.value) {
      map.set(node.id, node);
    }
    return map;
  });

  const edgeIdToEdgeMap = computed(() => {
    const map = new Map<CoreEdge['id'], CoreEdge>();
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
