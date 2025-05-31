<script setup lang="ts">
  import { ref } from 'vue';
  import { circle, CIRCLE_SCHEMA_DEFAULTS, type CircleSchema } from '.';
  import DocsCanvas from '@shape/DocsCanvas.vue';
  import { useShapePreview } from '@shape/docs';

  const canvas = ref<HTMLCanvasElement>();

  const props = withDefaults(
    defineProps<CircleSchema>(),
    CIRCLE_SCHEMA_DEFAULTS,
  );

  useShapePreview(canvas, circle, props);
</script>

<template>
  <DocsCanvas @ref="(el) => (canvas = el)" />
</template>
