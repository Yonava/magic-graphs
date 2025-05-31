<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'ref', value: HTMLCanvasElement | undefined): void;
  }>();

  const emitRef = (el: HTMLCanvasElement | undefined) => {
    emit('ref', el);
  };
</script>

<template>
  <canvas
    :ref="emitRef as any"
    width="400"
    height="400"
  ></canvas>
</template>
