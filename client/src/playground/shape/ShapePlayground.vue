<script setup lang="ts">
  import { ref } from 'vue';
  import colors from '@colors';
  import { square } from '@shapes';
  import type { Shape } from '@shape/types';
  import ShapePlaygroundToolbar from './ShapePlaygroundToolbar.vue';
  import MagicCanvas from '@canvas/MagicCanvas.vue';

  const canvas = ref<HTMLCanvasElement>();
  const setCanvas = (el: HTMLCanvasElement) => (canvas.value = el);

  const items = ref<Shape[]>([]);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    items.value = [];

    items.value.push(
      square({
        at: {
          x: 300,
          y: 300,
        },
        size: -200,
        fillColor: colors.RED_500,
        borderRadius: 20,
      }),
    );

    items.value.forEach((item) => item.draw(ctx));
  };
</script>

<template>
  <div class="h-full w-full">
    <div class="absolute m-3 flex gap-3 z-50">
      <ShapePlaygroundToolbar
        :canvas="canvas"
        :items="items"
      />
    </div>

    <MagicCanvas
      @canvas-ref="setCanvas"
      @draw="draw"
      class="bg-gray-700"
    />
  </div>
</template>
