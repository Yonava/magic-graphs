<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';

  import { computed, ref, watch } from 'vue';

  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { Lens } from '../../lens/types.ts';
  import { useThemer } from '../../themer/useThemer.ts';
  import { useProvidedGraph } from '../useProvidedGraph.ts';
  import LensChip from './LensChip.vue';
  import NodeLens2 from './NodeLens2.vue';
  import NodeLens from './NodeLens.vue';
  import { LensChipDefinition } from './types.ts';

  const graph = useProvidedGraph();

  const activeLensId = ref<string>();
  const hoveredLensId = ref<string>();

  const nodeThemer = useThemer({
    canvas: {
      'node.default.color': 'red',
    },
  });

  const nodeThemer2 = useThemer({
    canvas: {
      'node.default.color': 'blue',
    },
  });

  const nodeLens: Lens = {
    id: 'lens-1',
    components: [
      {
        component: NodeLens,
        position: 'center-left',
      },
    ],
    ...nodeThemer,
  };

  const nodeLens2: Lens = {
    id: 'lens-2',
    components: [
      {
        component: NodeLens2,
        position: 'center-left',
      },
    ],
    ...nodeThemer2,
  };

  const chips: LensChipDefinition[] = [
    {
      lens: nodeLens,
      title: 'Red Nodes',
      tooltipContent: 'Red Nodes',
    },
    {
      lens: nodeLens2,
      title: 'Blue Nodes',
      tooltipContent: 'Blue Nodes',
    },
  ];

  const toggleActiveLens = (lensId: string) => {
    if (lensId === activeLensId.value) {
      activeLensId.value = undefined;
      return;
    }

    activeLensId.value = lensId;
  };

  const activeChipId = computed(
    () => hoveredLensId.value ?? activeLensId.value,
  );

  const activeChip = computed(() => {
    if (!activeChipId.value) return;
    return nullThrows(
      chips.find((c) => c.lens.id === activeChipId.value),
      'active chip ID not in the chips array!',
    );
  });

  watch(activeChip, (newChip, oldChip) => {
    if (oldChip) {
      graph.magic.lens.remove(oldChip.lens.id);
    }
    if (newChip) {
      graph.magic.lens.add(newChip.lens);
    }
  });
</script>

<template>
  <Well>
    <HStack>
      <template v-for="chip of chips">
        <LensChip
          v-bind="chip"
          @click="() => toggleActiveLens(chip.lens.id)"
          @focus="hoveredLensId = chip.lens.id"
          @blur="hoveredLensId = undefined"
          @mouseenter="hoveredLensId = chip.lens.id"
          @mouseleave="hoveredLensId = undefined"
          :model-value="chip.lens.id === activeLensId"
        />
      </template>
    </HStack>
  </Well>
</template>
