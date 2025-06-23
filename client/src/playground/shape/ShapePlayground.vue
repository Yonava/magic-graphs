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
  import { DefineAnimation } from '@shape/animation/defineAnimation';

  const rotationAnimation = new DefineAnimation('rotate')
    .from()
    .rotate({ offsetBy: 0 })
    .at(0.5)
    .to()
    .rotate({ offsetBy: Math.PI })
    .duration({ ms: 3000 });

  const widthAnimation = new DefineAnimation('width');

  const {
    animation,
    shapes: { rect, square, line },
  } = useAnimatedShapes([rotationAnimation, widthAnimation]);

  const shapes = ref<Shape[]>([]);

  shapes.value.push(
    rect({
      id: 'test',
      width: 140,
      height: 140,
      at: { x: -200, y: -300 },
    }),
    square({
      id: 'test',
      size: 100,
      at: { x: 200, y: -300 },
    }),
    line({
      id: 'test',
      start: { x: 0, y: 0 },
      end: { x: 300, y: 300 },
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
      <Button @click="animation.start('test', 'rotate')">
        Start Animation
      </Button>
      <Button @click="animation.stop('test')"> Stop Animation </Button>
    </div>

    <MagicCanvas
      v-bind="magic.ref"
      class="bg-gray-700"
    />
  </div>
</template>
