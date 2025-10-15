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

const blobs = computed(() => {
  return [[0, 0], [300, 400], [-700, 60], [300, -500], [-500, -450], [-250, 300]].map(([x, y], i) => shapes.circle({
    id: 'blob' + String(i),
    at: { x, y },
    radius: bigger.value ? 75 : 0,
    fillColor: bigger.value ? colors.RED_600 : 'transparent',
    // textArea: {
    //   textBlock: {
    //     content: 'Large VPC',
    //     color: bigger.value ? 'white' : 'transparent',
    //     fontWeight: 'bold',
    //     fontSize: 20
    //   },
    //   color: 'transparent'
    // }
  }))
})

const satellites = computed(() => {
  return [[200, 0], [0, 200], [-200, 0], [0, -200], [400, 400], [600, 300], [100, 700], [900, -400], [-800, -700], [-500, 900], [-1200, 300]].map(([x, y], i) => shapes.circle({
    id: 'node' + String(i),
    textArea: {
      textBlock: {
        content: 'Node ' + i,
        color: bigger.value ? 'transparent' : 'white',
        fontSize: bigger.value ? 0 : 8,
      },
      color: 'transparent'
    },
    at: bigger.value ? { x: 0, y: 0 } : { x: x / 4, y: y / 4 },
    radius: bigger.value ? 75 : 20,
    fillColor: bigger.value ? colors.RED_600 : (y > -500 && x > -500 ? (y > 0 && x > 0 ? colors.RED_800 : colors.ORANGE_700) : colors.PURPLE_700)
  }))
})

canvas.draw.content.value = (ctx) => [...blobs.value, ...satellites.value].forEach((el) => el.draw(ctx))

canvas.draw.backgroundPattern.value = (ctx, at, alpha) => cross({
  at,
  size: 12,
  lineWidth: 1,
  fillColor: colors.GRAY_600 + alpha,
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
