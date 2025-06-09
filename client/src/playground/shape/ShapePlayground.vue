<script setup lang="ts">
  import { ref } from 'vue';
  import colors from '@colors';
  import { square } from '@shapes';
  import type { Shape } from '@shape/types';
  import ShapePlaygroundToolbar from './ShapePlaygroundToolbar.vue';
  import MagicCanvas from '@canvas/MagicCanvas.vue';
  import { useMagicCanvas } from '@canvas/index';

  const shapes = ref<Shape[]>([]);

  shapes.value.push(
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

  const magic = useMagicCanvas({
    draw: (ctx) => shapes.value.forEach((item) => item.draw(ctx)),
  });
</script>

<template>
  <div class="h-full w-full">
    <div class="absolute m-3 flex gap-3 z-50">
      <ShapePlaygroundToolbar
        :canvas="magic.canvas.value"
        :items="shapes"
      />
    </div>

    <MagicCanvas
      v-bind="magic.ref"
      class="bg-gray-700"
    />
  </div>
</template>
