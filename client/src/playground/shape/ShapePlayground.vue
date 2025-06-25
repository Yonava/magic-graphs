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

  const {
    defineTimeline,
    shapes: { arrow },
  } = useAnimatedShapes();

  const { play, stop } = defineTimeline({
    forShapes: ['rect', 'line'],
    durationMs: 3000,
    keyframes: [
      {
        progress: 0.5,
        properties: {
          fillColor: 'red',
        },
      },
    ],
  });

  const shapes = ref<Shape[]>([]);

  shapes.value.push(
    arrow({
      id: 'test',
      lineWidth: 20,
      start: { x: 0, y: -50 },
      end: { x: 300, y: -50 },
      textArea: {
        textBlock: {
          content: 'hello',
        },
      },
    }),
  );

  const magic = useMagicCanvas();
  magic.draw.content.value = (ctx) => shapes.value.forEach((i) => i.draw(ctx));

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
        :items="shapes"
      />
      <Button @click="play({ shapeId: 'test', runCount: Infinity })">
        Start Animation
      </Button>
      <Button @click="stop({ shapeId: 'test' })"> Stop Animation </Button>
    </div>

    <MagicCanvas
      v-bind="magic.ref"
      class="bg-gray-700"
    />
  </div>
</template>
