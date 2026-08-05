<script setup lang="ts">
  import HStackVue from '@magic/shared/HStack';
  import NodeVue from '@magic/shared/Node';
  import VStackVue from '@magic/shared/VStack';
  import WellVue from '@magic/shared/Well';
  import { GEdge } from '@magic/shared/graph';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();

  const mstNodes = (mst: GEdge[]) => {
    const nodeIds: string[] = [];
    if (mst.length) {
      nodeIds.push(mst[0].source);
    }
    for (const edge of mst.slice(1)) {
      nodeIds.push(edge.target);
    }
    return nodeIds;
  };
</script>

<template>
  <WellVue>
    <VStackVue class="gap-4">
      <HStackVue v-for="mst in graph.minimumSpanningTrees.all.value.msts">
        <NodeVue
          v-for="id in mstNodes(mst)"
          :key="id"
          :id="id"
        />
      </HStackVue>
    </VStackVue>
  </WellVue>
</template>
