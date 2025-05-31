<script setup lang="ts">
  import { ref } from 'vue';
  import { circle, CIRCLE_SCHEMA_DEFAULTS, type CircleSchema } from '.';
  import DocsCanvas from '@shape/DocsCanvas.vue';
  import { useShapePreview, type DocMarkingOptions } from '@shape/docs';

  const canvas = ref<HTMLCanvasElement>();

  const props = withDefaults(
    defineProps<CircleSchema & Partial<DocMarkingOptions>>(),
    {
      ...CIRCLE_SCHEMA_DEFAULTS,
      showAtMarker: false,
      showMeasuringStick: false,
    },
  );

  const { showAtMarker, showMeasuringStick, ...rest } = props;

  useShapePreview(canvas, circle, rest, { showAtMarker, showMeasuringStick });
</script>

<template>
  <DocsCanvas @ref="(el) => (canvas = el)" />
</template>
