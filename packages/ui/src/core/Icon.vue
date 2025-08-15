<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    icon: string;
  }>();

  const defaultClasses = ['select-none'];

  const iconClass = computed(() => {
    return `mdi mdi-${props.icon}`;
  });

  const classes = computed(() => {
    return [...defaultClasses, iconClass.value];
  });
</script>

<template>
  <span :class="[classes, 'text-2xl']"></span>
</template>
