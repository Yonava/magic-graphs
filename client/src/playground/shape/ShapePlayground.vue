<script setup lang="ts">
  import { ref } from 'vue';
  import colors from '@colors';
  import { cross } from '@shapes/cross';
  import type { Shape } from '@shape/types';
  import { useAnimatedShapes } from '@shape/animation';
  import MagicCanvas from '@canvas/MagicCanvas.vue';
  import { useMagicCanvas } from '@canvas/index';
  import Button from '@ui/core/button/Button.vue';

  const { defineTimeline, shapes } = useAnimatedShapes();

  const { play, stop, pause, resume } = defineTimeline({
    forShapes: ['line'],
    durationMs: 4000,
    customInterpolations: {
      fillGradient: {
        value: (p) => [
          {
            color: 'red',
            offset: 0,
          },
          {
            color: 'red',
            offset: p < 0.5 ? p * 2 : 2 - p * 2,
          },
          {
            color: 'black',
            offset: p < 0.5 ? p * 2 : 2 - p * 2,
          },
        ],
      },
    },
    keyframes: [
      {
        progress: 0.5,
        properties: {
          end: { x: 50, y: 300 },
          start: { x: 250, y: 0 },
          lineWidth: 50,
        },
      },
    ],
  });

  const paintedShapes = ref<Shape[]>([]);

  paintedShapes.value.push(
    shapes.line({
      id: 'test',
      start: { x: 0, y: 0 },
      end: { x: 200, y: 200 },
    }),
  );

  const magic = useMagicCanvas();
  magic.draw.content.value = (ctx) =>
    paintedShapes.value.forEach((i) => i.draw(ctx));

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
