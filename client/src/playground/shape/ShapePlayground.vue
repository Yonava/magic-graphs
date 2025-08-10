<script setup lang="ts">
  import MagicCanvas from '@canvas/MagicCanvas.vue';
  import { useMagicCanvas } from '@canvas/index';
  import colors from '@colors';
  import { useAnimatedShapes } from '@shape/animation';
  import { cross } from '@shapes/cross';
  import Button from '@ui/core/button/Button.vue';

  const { defineTimeline, shapes, getAnimatedProp } = useAnimatedShapes();

  const { play, stop, pause, resume } = defineTimeline({
    forShapes: ['circle'],
    durationMs: 6000,
    customInterpolations: {
      stroke: {
        value: (progress) => {
          const r = getAnimatedProp('test', 'radius');
          const numOfDashes = 5;
          const lengthGapRatio = 40 / 22.832;
          const circum = 2 * r * Math.PI;
          const p = circum / numOfDashes;
          const dashLength = (lengthGapRatio / (lengthGapRatio + 1)) * p;
          const gapLength = (1 / (lengthGapRatio + 1)) * p;
          return {
            lineWidth: 10,
            color: 'red',
            dash: {
              pattern: [dashLength, gapLength],
              offset: progress * circum,
            },
          };
        },
      },
    },
    keyframes: [{ progress: 0.5, properties: { radius: 100 } }],
  });

  const cir = shapes.circle({
    id: 'test',
    at: { x: 0, y: 0 },
    radius: 50,
    textArea: { textBlock: { content: '1' } },
  });

  const cir2 = shapes.circle({
    id: 'test2',
    at: { x: 200, y: 0 },
    radius: 50,
    stroke: {
      lineWidth: 10,
      color: 'red',
      dash: {
        pattern: [40, 22.832],
        offset: 90,
      },
    },
    textArea: { textBlock: { content: '2' } },
  });

  const magic = useMagicCanvas();
  magic.draw.content.value = (ctx) => {
    cir.draw(ctx);
    cir2.draw(ctx);
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
