<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';

  import { computed, ref, watch } from 'vue';

  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { useProvidedGraph } from '../useProvidedGraph.ts';
  import LensChip from './LensChip.vue';

  const graph = useProvidedGraph();

  const activeLensId = ref<string>();
  const hoveredLensId = ref<string>();

  const chips = computed(() =>
    nullThrows(
      graph.magic.product.lensChips,
      'rendered lens chip group without chips!',
    ),
  );

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
      chips.value.find((c) => c.lens.id === activeChipId.value),
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
