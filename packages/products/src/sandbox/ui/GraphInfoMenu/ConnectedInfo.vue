<script setup lang="ts">
  import definitions from '@magic/graph-plugins/characteristics/definitions';

  import { computed } from 'vue';

  import { nonNullGraph as graph } from '../../../shared/globalGraph.ts';
  import GHoverInfo from '../../../shared/ui/graph-core/GHoverInfo.vue';
  import { useBipartiteColorizer } from './useBipartiteColorizer.ts';
  import { useCycleColorizer } from './useCycleColorizer.ts';
  import { useSCCColorizer } from './useSCCColorizer.ts';

  const isConnected = computed(
    () => graph.value.characteristics.connected.isConnected.value,
  );
  const isWeaklyConnected = computed(
    () => graph.value.characteristics.connected.isWeaklyConnected.value,
  );
  const isDirected = computed(() => graph.value.settings.value.isGraphDirected);

  const SCCs = computed(() => {
    const components =
      graph.value.characteristics.sccs.stronglyConnectedComponents.value;
    return components.map((nodes: { id: string }[]) =>
      nodes.map((node) => graph.value.nodeLabel.get(node.id)),
    );
  });

  const isBipartite = computed(
    () => graph.value.characteristics.bipartite.isBipartite.value,
  );

  const isAcyclic = computed(
    () => graph.value.characteristics.cycles.isAcyclic.value,
  );

  const isComplete = computed(
    () => graph.value.characteristics.complete.isComplete.value,
  );

  const { color: colorizeSCCs, uncolor: decolorizeSCCs } = useSCCColorizer(
    graph.value,
  );

  const { colorize: colorizeBipartite, decolorize: decolorizeBipartite } =
    useBipartiteColorizer(graph.value);

  const { colorize: colorizeCycles, decolorize: decolorizeCycles } =
    useCycleColorizer(graph.value);
</script>

<template>
  <div class="mb-2 text-sm">
    <div
      v-if="isDirected"
      class="flex flex-wrap gap-2"
    >
      <GHoverInfo :tooltip="definitions.stronglyConnected">
        Strongly Connected? {{ isConnected ? 'Yes' : 'No' }}
      </GHoverInfo>

      <GHoverInfo :tooltip="definitions.weaklyConnected">
        Weakly Connected? {{ isWeaklyConnected ? 'Yes' : 'No' }}
      </GHoverInfo>

      <GHoverInfo
        @mouseenter="colorizeSCCs"
        @mouseleave="decolorizeSCCs"
        :tooltip="definitions.stronglyConnectedComponents"
      >
        Strongly Connected Components: {{ SCCs.length }}
      </GHoverInfo>

      <GHoverInfo
        @mouseenter="colorizeBipartite"
        @mouseleave="decolorizeBipartite"
        :tooltip="definitions.bipartite"
      >
        Bipartite? {{ isBipartite ? 'Yes' : 'No' }}
      </GHoverInfo>

      <GHoverInfo
        @mouseenter="colorizeCycles"
        @mouseleave="decolorizeCycles"
        :tooltip="definitions.acyclic"
      >
        Acyclic? {{ isAcyclic ? 'Yes' : 'No' }}
      </GHoverInfo>

      <GHoverInfo :tooltip="definitions.complete">
        Complete? {{ isComplete ? 'Yes' : 'No' }}
      </GHoverInfo>
    </div>
    <div
      v-else
      class="flex flex-wrap gap-2"
    >
      <GHoverInfo :tooltip="definitions.connected">
        Connected? {{ isConnected ? 'Yes' : 'No' }}
      </GHoverInfo>

      <GHoverInfo
        @mouseenter="colorizeBipartite"
        @mouseleave="decolorizeBipartite"
        :tooltip="definitions.bipartite"
      >
        Bipartite? {{ isBipartite ? 'Yes' : 'No' }}
      </GHoverInfo>

      <GHoverInfo
        @mouseenter="colorizeCycles"
        @mouseleave="decolorizeCycles"
        :tooltip="definitions.acyclic"
      >
        Acyclic? {{ isAcyclic ? 'Yes' : 'No' }}
      </GHoverInfo>

      <GHoverInfo :tooltip="definitions.complete">
        Complete? {{ isComplete ? 'Yes' : 'No' }}
      </GHoverInfo>
    </div>
  </div>
</template>
