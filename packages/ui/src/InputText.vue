<script setup lang="ts">
  const model = defineModel<string>();
</script>

<template>
  <input
    v-model="model"
    type="text"
    class="p-1 border border-gray-300 rounded-md"
  />
</template>
