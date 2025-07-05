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

  const { play: play1, stop: stop1 } = defineTimeline({
    forShapes: ['circle'],
    durationMs: 2000,
    easing: { radius: 'in-out' },
    keyframes: [
      {
        progress: 0.5,
        properties: {
          radius: (r) => r * 6,
        },
      },
    ],
  });

  const { play: play2, stop: stop2 } = defineTimeline({
    forShapes: ['star', 'circle'],
    durationMs: 2000,
    keyframes: [
      {
        progress: 0.5,
        properties: {
          fillColor: 'red',
        },
      },
    ],
  });

  const paintedShapes = ref<Shape[]>([]);

  paintedShapes.value.push(
    shapes.circle({
      id: 'test1',
      at: { x: 0, y: 0 },
      radius: 50,
    }),
    shapes.star({
      id: 'test2',
      textArea: { textBlock: { content: 'Loch!' } },
      fillColor: 'green',
      innerRadius: 40,
      outerRadius: 80,
      at: { x: 100, y: 300 },
    }),

    // shapes.line({
    //   id: 'this-line',
    //   dash: [20, 10],

    // })
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
      <Button @click="play1({ shapeId: 'test1', runCount: Infinity })">
        Start1
      </Button>
      <Button @click="play2({ shapeId: 'test1', runCount: Infinity })">
        Start2
      </Button>
      <Button @click="stop1({ shapeId: 'test1' })"> Stop1 </Button>
      <Button @click="stop2({ shapeId: 'test1' })"> Stop2 </Button>
    </div>

    <MagicCanvas
      v-bind="magic.ref"
      class="bg-gray-700"
    />
  </div>
</template>
