<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getCtx } from '@utils/ctx';
  import { circle, CIRCLE_SCHEMA_DEFAULTS, type CircleSchema } from '.';

  const canvas = ref<HTMLCanvasElement>();

  const props = withDefaults(
    defineProps<CircleSchema>(),
    CIRCLE_SCHEMA_DEFAULTS,
  );

  onMounted(() => {
    const ctx = getCtx(canvas);
    circle(props).draw(ctx);
  });
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
