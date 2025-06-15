<script setup lang="ts">
  import GToolbarButton from '@ui/graph/toolbar/GToolbarButton.vue';
  import GToolbarBase from '@ui/graph/toolbar/GToolbarBase.vue';
  import ToolbarButtonGroup from '@ui/core/toolbar/ToolbarButtonGroup.vue';
  import GWell from '@ui/graph/GWell.vue';
  import { computed } from 'vue';
  import type { MagicCanvasProps } from '@canvas/types';
  import { MAX_ZOOM, MIN_ZOOM } from '@canvas/camera/panZoom';

  const props = defineProps<Pick<MagicCanvasProps, 'camera'>>();

  const zoom = computed(() => props.camera.state.zoom.value);

  const normalizedZoom = computed(() => {
    const logMin = Math.log(MIN_ZOOM);
    const logMax = Math.log(MAX_ZOOM);
    const logZoom = Math.log(zoom.value);
    return (logZoom - logMin) / (logMax - logMin);
  });

  const zoomPercentage = computed(() => Math.round(normalizedZoom.value * 100));
</script>

<template>
  <GToolbarBase>
    <ToolbarButtonGroup>
      <GToolbarButton
        @click="camera.actions.zoomOut()"
        :disabled="zoom <= MIN_ZOOM"
        icon="minus"
      ></GToolbarButton>
      <GWell class="w-12 text-center">
        <p class="text-sm font-semibold">{{ zoomPercentage }}%</p>
      </GWell>
      <GToolbarButton
        @click="camera.actions.zoomIn()"
        :disabled="zoom >= MAX_ZOOM"
        icon="plus"
      ></GToolbarButton>
    </ToolbarButtonGroup>
  </GToolbarBase>
</template>
