<script setup lang="ts">
  const model = defineModel<boolean>();
</script>

<template>
  <input
    v-model="model"
    type="checkbox"
  />
</template>
