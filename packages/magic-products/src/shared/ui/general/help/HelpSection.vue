<script setup lang="ts">
  defineProps<{
    title: string;
  }>();
</script>

<template>
  <div>
    <h2 class="font-bold text-lg text-md mb-1">{{ title }}</h2>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
