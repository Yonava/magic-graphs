<script setup lang="ts">
  import { computed } from 'vue';
  import { nonNullGraph as graph } from '@graph/global';
  import GHoverInfo from '@ui/graph/GHoverInfo.vue';
  import { useSCCColorizer } from './useSCCColorizer';
  import { useBipartiteColorizer } from './useBipartiteColorizer';
  import { useCycleColorizer } from './useCycleColorizer';
  import definitions from '@graph/plugins/characteristics/definitions';

  const isConnected = computed(
    () => graph.value.characteristics.isConnected.value,
  );
  const isWeaklyConnected = computed(
    () => graph.value.characteristics.isWeaklyConnected.value,
  );
  const isDirected = computed(() => graph.value.settings.value.isGraphDirected);

  const SCCs = computed(() => {
    const components =
      graph.value.characteristics.stronglyConnectedComponents.value;
    return components.map((nodes) => nodes.map((node) => node.label));
  });

  const isBipartite = computed(
    () => graph.value.characteristics.isBipartite.value,
  );

  const isAcyclic = computed(() => graph.value.characteristics.isAcyclic.value);

  const isComplete = computed(
    () => graph.value.characteristics.isComplete.value,
  );

  const { colorize: colorizeSCCs, decolorize: decolorizeSCCs } =
    useSCCColorizer(graph.value);

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
