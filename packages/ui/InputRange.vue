<script setup lang="ts">
  const model = defineModel<number>();
</script>

<template>
  <input
    v-model.number="model"
    type="range"
  />
</template>
