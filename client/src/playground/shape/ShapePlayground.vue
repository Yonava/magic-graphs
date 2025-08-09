<script setup lang="ts">
  import MagicCanvas from '@canvas/MagicCanvas.vue';
  import { useMagicCanvas } from '@canvas/index';
  import colors from '@colors';
  import { useAnimatedShapes } from '@shape/animation';
  import { cross } from '@shapes/cross';
  import Button from '@ui/core/button/Button.vue';

  const { defineTimeline, shapes } = useAnimatedShapes();

  const { play, stop, pause, resume } = defineTimeline({
    forShapes: ['circle'],
    durationMs: 3000,
    customInterpolations: {
      stroke: {
        value: (p) => ({
          lineWidth: 10 + (p < 0.5 ? p * 10 : 10 - p * 10),
          color: 'red',
          dash: [10, 10 + (p < 0.5 ? p * 10 : 10 - p * 10)],
        }),
      },
    },
    keyframes: [],
  });

  const cir = shapes.circle({
    id: 'test',
    at: { x: 0, y: 0 },
    radius: 50,
    stroke: {
      color: 'red',
      lineWidth: 10,
    },
    textArea: { textBlock: { content: 'real' } },
  });

  const magic = useMagicCanvas();
  magic.draw.content.value = (ctx) => {
    cir.draw(ctx);
  };

  magic.draw.backgroundPattern.value = (ctx, at) => {
    cross({
      at,
      size: 14,
      lineWidth: 1,
      fillColor: colors.GRAY_600,
    }).draw(ctx);
  };
</script>

<template>
  <div class="h-full w-full">
    <div class="absolute m-3 flex gap-3 z-50">
      <Button @click="play({ shapeId: 'test' })"> Start Animation </Button>
      <Button @click="stop({ shapeId: 'test' })"> Stop Animation </Button>
      <Button @click="pause({ shapeId: 'test' })"> Pause Animation </Button>
      <Button @click="resume({ shapeId: 'test' })"> Resume Animation </Button>
    </div>

    <MagicCanvas
      v-bind="magic.ref"
      class="bg-gray-700"
    />
  </div>
</template>
