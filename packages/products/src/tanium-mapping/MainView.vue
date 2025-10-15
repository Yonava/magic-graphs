<script setup lang="ts">
import { useMagicCanvas } from "@magic/canvas/index";
import MagicCanvas from "@magic/canvas/MagicCanvas.vue";
import { useAnimatedShapes } from "@magic/shapes/animation";
import { getCtx } from "@magic/utils/ctx";
import { computed, ref, watch } from "vue";
import Button from "@magic/ui/core/button/Button.vue";
import { cross } from "@magic/shapes/shapes/cross";
import colors from "@magic/utils/colors";

const ZOOM_FACTOR = 0.75

const canvas = useMagicCanvas({ storageKey: 'tanium-mapping' })

const { shapes, autoAnimate } = useAnimatedShapes()

const bigger = ref(canvas.camera.state.zoom.value < ZOOM_FACTOR)

const setBigger = (val: boolean) => {
  if (val === bigger.value) return;
  const f = autoAnimate.captureFrame(() => canvas.draw.content.value(getCtx(canvas.canvas)))
  bigger.value = val;
  f();
}

const blob = computed(() => {
  return shapes.circle({ id: 't', at: { x: 0, y: 0 }, radius: bigger.value ? 150 : 50, fillColor: bigger.value ? 'blue' : 'red' })
})

canvas.draw.content.value = (ctx) => [blob.value].forEach((el) => el.draw(ctx))

canvas.draw.backgroundPattern.value = (ctx, at, alpha) => cross({
  at,
  size: 12,
  lineWidth: 1,
  fillColor: colors.GRAY_500 + alpha,
}).draw(ctx);

watch(canvas.camera.state.zoom, (newZoom) => {
  setBigger(newZoom < ZOOM_FACTOR)
})
</script>

<template>
  <div class="absolute top-0 left-0 p-2">
    <Button @click="bigger = !bigger">Bigger</Button>
  </div>
  <MagicCanvas v-bind="canvas.ref" class="bg-gray-800" />
</template>
