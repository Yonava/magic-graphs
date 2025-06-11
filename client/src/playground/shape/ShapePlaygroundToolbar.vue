<script setup lang="ts">
  import { computed, toRefs } from 'vue';
  import type { Shape } from '@shape/types';
  import { useHeatmap } from '@playground/shape/useHeatmap';
  import Button from '@ui/core/button/Button.vue';
  import InputRange from '@ui/InputRange.vue';

  const props = defineProps<{
    canvas: HTMLCanvasElement | undefined;
    items: Shape[];
  }>();

  const { items, canvas } = toRefs(props);

  const {
    heatmapActive,
    heatmapOpacity,
    heatmapResolution,
    toggleHeatmapMode,
    heatmapMode,
  } = useHeatmap(canvas, items);

  const heatmapBtnText = computed(() =>
    heatmapActive.value ? 'Hide Heatmap' : 'Show Heatmap',
  );

  const toggleHeatmapModeButtonText = computed(() =>
    heatmapMode.value === 'efficient' ? 'Precise Heatmap' : 'Efficient Heatmap',
  );
</script>

<template>
  <Button @click="heatmapActive = !heatmapActive">
    {{ heatmapBtnText }}
  </Button>

  <Button
    v-if="heatmapActive"
    @click="toggleHeatmapMode"
  >
    {{ toggleHeatmapModeButtonText }}
  </Button>

  <div
    v-if="heatmapActive"
    class="flex items-center gap-3 text-white h-6 mt-1 text-sm font-bold"
  >
    <div>
      <p>Opacity {{ heatmapOpacity }}</p>

      <InputRange
        v-model.number="heatmapOpacity"
        min="0"
        max="100"
      />
    </div>

    <div>
      <p>Resolution {{ heatmapResolution }}</p>

      <InputRange
        v-model.number="heatmapResolution"
        min="1"
        max="10"
      />
    </div>
  </div>
</template>
