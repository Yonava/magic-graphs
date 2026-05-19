<script setup lang="ts">
  import MagicCanvas from '@magic/canvas/MagicCanvas.vue';
  import { useMagicCanvas } from '@magic/canvas/index';
  import { circle } from '@magic/shapes/shapes/circle';
  import { Shape } from '@magic/shapes/types';

  import CameraDebugInfo from './CanvasDebugInfo.vue';

  const dots: Shape[] = [];

  const magic = useMagicCanvas();
  magic.draw.content.value = (ctx) => dots.forEach((dot) => dot.draw(ctx));

  const addDot = () => {
    dots.push(circle({ radius: 20, at: magic.cursorCoordinates.value }));
  };
</script>

<template>
  <div class="absolute top-6 left-6">
    <CameraDebugInfo :canvas="magic" />
  </div>
  <MagicCanvas
    @dblclick="addDot"
    v-bind="magic.ref"
    class="bg-gray-700"
  />
</template>
