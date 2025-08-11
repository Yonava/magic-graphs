<script setup lang="ts">
  import CameraDebugInfo from "./CanvasDebugInfo.vue";
  import type { Shape } from "@shape/types";
  import { circle } from "@shapes/circle";

  import { useMagicCanvas } from "..";
  import MagicCanvas from "../MagicCanvas.vue";

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
