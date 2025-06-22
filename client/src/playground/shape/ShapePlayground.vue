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

  const anim = new DefineAnimation('width', 1000)
    .from()
    .width(0)
    .at(0.5)
    .width(0.2)
    .to()
    .width(1);

  const {
    animation,
    shapes: { square },
  } = useAnimatedShapes([anim]);

  const shapes = ref<Shape[]>([]);

  shapes.value.push(
    square({
      id: 'test',
      size: 100,
      at: { x: 0, y: 0 },
    }),
  );

  const magic = useMagicCanvas();
  magic.draw.content.value = (ctx) => shapes.value.forEach((i) => i.draw(ctx));

  magic.draw.backgroundPattern.value = (ctx, at) => {
    cross({
      at,
      size: 8,
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
      <Button @click="animation.start('test', 'width', 3)">
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
