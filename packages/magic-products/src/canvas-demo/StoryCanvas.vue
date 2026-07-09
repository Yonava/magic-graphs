<script setup lang="ts">
  import CanvasSurface from '@canvas/surface/CanvasSurface.vue';
  import { useCanvas } from '@canvas/surface/index';
  import { circle } from '@canvas/primitives/shapes/circle/index';
  import { Shape } from '@canvas/primitives/types/index';

  import CameraDebugInfo from './CanvasDebugInfo.vue';

  const dots: Shape[] = [];

  const canvas = useCanvas();
  canvas.draw.content.value = (ctx) => dots.forEach((dot) => dot.draw(ctx));

  const addDot = () => {
    dots.push(circle({ radius: 20, at: canvas.cursorCoordinates.value }));
  };
</script>

<template>
  <div class="absolute top-6 left-6">
    <CameraDebugInfo :canvas="canvas" />
  </div>
  <CanvasSurface
    @dblclick="addDot"
    v-bind="canvas.ref"
    class="bg-gray-700"
  />
</template>
