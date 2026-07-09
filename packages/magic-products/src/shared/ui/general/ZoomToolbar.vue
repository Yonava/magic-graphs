<script setup lang="ts">
  import { MAX_ZOOM, MIN_ZOOM } from '@canvas/surface/camera/panZoom';
  import type { CanvasProps } from '@canvas/surface/types';
  import ToolbarButtonGroup from '@core/ui/core/toolbar/ToolbarButtonGroup.vue';

  import { computed } from 'vue';

  import GWell from '../../../shared/ui/graph-core/GWell.vue';
  import GToolbarBase from '../../../shared/ui/graph-core/toolbar/GToolbarBase.vue';
  import GToolbarButton from '../../../shared/ui/graph-core/toolbar/GToolbarButton.vue';

  const props = defineProps<Pick<CanvasProps, 'camera'>>();

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
