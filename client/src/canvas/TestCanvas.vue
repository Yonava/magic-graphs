<script setup lang="ts">
  import { ref } from 'vue';
  import type { Shape } from '@shape/types';
  import MagicCanvas from './MagicCanvas.vue';
  import { circle } from '@shapes';
  import { useMagicCanvas } from './useMagicCanvas';

  const shapes = ref<Shape[]>([
    circle({
      radius: 50,
      at: { x: 100, y: 100 },
    }),
  ]);

  const draw = (ctx: CanvasRenderingContext2D) => {
    shapes.value.forEach((shape) => shape.draw(ctx));
  };

  const props = useMagicCanvas();

  const click = () => {
    shapes.value.push(
      circle({
        radius: 20,
        fillColor: 'red',
        at: props.coordinates.value,
      }),
    );
  };
</script>

<template>
  <MagicCanvas
    @draw="draw"
    @dblclick="click"
    class="bg-gray-700"
    v-bind="props"
  />
</template>
