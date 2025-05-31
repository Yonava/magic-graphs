<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useDark, useWindowSize } from '@vueuse/core';
  import ResponsiveCanvas from '@utils/components/ResponsiveCanvas.vue';
  import colors from '@colors';
  import { useOptimizedShapes, square } from '@shapes';
  import type { Shape } from '@shape/types';
  import { getCtx } from '@utils/ctx';
  import ShapePlaygroundToolbar from './Toolbar.vue';

  const canvas = ref<HTMLCanvasElement>();
  const isDark = useDark();

  const color = computed(() =>
    isDark.value ? colors.GRAY_800 : colors.GRAY_200,
  );

  const items = ref<Shape[]>([]);

  const patternColor = computed(
    () => (isDark.value ? colors.GRAY_200 : colors.GRAY_700) + '15',
  );

  const draw = () => {
    const ctx = getCtx(canvas);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    items.value = [];

    items.value.push(
      square({
        at: {
          x: 300,
          y: 300,
        },
        size: -200,
        color: colors.RED_500,
        borderRadius: 20,
      }),
    );

    items.value.forEach((item) => item.draw(ctx));
  };

  document.addEventListener('resize', draw);

  document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') draw();
  });

  setTimeout(draw, 100);

  const { width, height } = useWindowSize();
</script>

<template>
  <div class="h-full w-full">
    <div class="absolute m-3 flex gap-3 z-50">
      <ShapePlaygroundToolbar
        :canvas="canvas"
        :items="items"
        :draw="draw"
      />
    </div>

    <ResponsiveCanvas
      @canvas-ref="(el) => (canvas = el)"
      :color="color"
      :pattern-color="patternColor"
      :canvas-width="width"
      :canvas-height="height"
    ></ResponsiveCanvas>
  </div>
</template>
