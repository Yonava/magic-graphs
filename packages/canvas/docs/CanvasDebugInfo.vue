<script setup lang="ts">
  import type { MagicCanvasProps } from '@canvas/types';

  defineProps<{ canvas: MagicCanvasProps }>();
</script>

<template>
  <div
    class="p-2 px-4 bg-gray-900 text-white text-xl flex flex-col rounded-lg pointer-events-none"
  >
    <div class="text-2xl mb-2"><b>Camera State</b></div>
    <div><b>PanX:</b> {{ Math.round(canvas.camera.state.panX.value) }}</div>
    <div><b>PanY:</b> {{ Math.round(canvas.camera.state.panY.value) }}</div>
    <div><b>Zoom:</b> {{ canvas.camera.state.zoom.value.toFixed(2) }}</div>

    <div class="text-2xl my-2"><b>Cursor Position</b></div>
    <div>
      <b>CursorX:</b> {{ Math.round(canvas.cursorCoordinates.value.x) }}
    </div>
    <div>
      <b>CursorY:</b> {{ Math.round(canvas.cursorCoordinates.value.y) }}
    </div>
  </div>
</template>
