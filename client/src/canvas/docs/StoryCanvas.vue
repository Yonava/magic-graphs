<script setup lang="ts">
  import type { Shape } from '@shape/types';
  import MagicCanvas from '../MagicCanvas.vue';
  import { circle } from '@shapes';
  import { useMagicCanvas } from '..';

  const dots: Shape[] = [];

  const magic = useMagicCanvas();
  magic.draw.content.value = (ctx) => dots.forEach((dot) => dot.draw(ctx));

  const addDot = () => {
    dots.push(circle({ radius: 20, at: magic.cursorCoordinates.value }));
  };
</script>

<template>
  <MagicCanvas
    @dblclick="addDot"
    v-bind="magic.ref"
    class="bg-gray-700"
  />
</template>
