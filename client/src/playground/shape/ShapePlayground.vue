<script setup lang="ts">
  import { ref } from 'vue';
  import colors from '@colors';
  import { cross } from '@shapes/cross';
  import type { Shape } from '@shape/types';
  import { useAnimatedShapes } from '@shape/animation';
  import ShapePlaygroundToolbar from './ShapePlaygroundToolbar.vue';
  import MagicCanvas from '@canvas/MagicCanvas.vue';
  import { useMagicCanvas } from '@canvas/index';
  import Button from '@ui/core/button/Button.vue';

  const { defineTimeline, shapes } = useAnimatedShapes();

  const { play, stop, pause, resume } = defineTimeline({
    forShapes: ['circle'],
    durationMs: 2000,
    easing: { radius: 'in-out' },
    keyframes: [
      {
        progress: 0.5,
        properties: {
          radius: (r) => r * 6,
          textArea: {
            color: 'blue',
            textBlock: { color: 'red' },
          },
        },
      },
    ],
  });

  const paintedShapes = ref<Shape[]>([]);

  paintedShapes.value.push(
    shapes.circle({
      id: 'test',
      at: { x: 0, y: 0 },
      radius: 50,
      textArea: { textBlock: { content: 'Loch!' } },
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
      <ShapePlaygroundToolbar
        :canvas="magic.canvas.value"
        :items="paintedShapes"
      />
      <Button @click="play({ shapeId: 'test', runCount: Infinity })">
        Start Animation
      </Button>
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
